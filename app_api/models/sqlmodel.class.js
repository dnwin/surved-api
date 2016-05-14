/**
 * Created by dennis on 5/9/16.
 */
"use strict";
const 
    util = require('../util/util.js'),
    bluebird = require('bluebird');

/**
 * Class SqlModel
 * This class can be instantiated with a sequelize model to auto generate a instance model containing `RESTful` methods.
 */
class SequelizeModel {

    /**
     * 
     * @param sequelizeModel - A sequelize model from the /app_api/sqlmodels folder
     * @param viewOptions - Sequelize custom viewOptions if you'd prefer all results to return with included or excluded data.
     * 
     * @param processBuildCallback - 
     *  Required callback function containing the parameters (&build, &data). 
     *  Use this to set your values from req.body to the values in the sequelize instance. 
     *  NEEDS TO RETURN BUILD
     *  (Ex: build.name = data.name; build.createdAt = new Date();) 
     *  @returns { &build }
     *  
     * @param processFkCallback -
     *  Requried callback function with parameters (&build, data)
     *  Process any additional processing after creation of the record or instance such as 
     *  setting relationships. NEEDS TO RETURN A RESOLVED PROMISE.
     *  @returns { Promise }
     *  
     */
    constructor(sequelizeModel, viewOptions, processBuildCallback, processFkCallback) {
        // PUBLIC
        this.sequelizeModel = sequelizeModel;
        this.viewOptions = viewOptions || null;
        this.primaryKeyString = sequelizeModel.primaryKeyField;

        // PRIVATE
        this._processBuildCallback = processBuildCallback;
        this._processFkCallback = processFkCallback;

    };

    /**
     * PUBLIC METHODS
     */

    // all, create, fetch, update, destroy

    /**
     * all - Get all records
     * @param customViewOptions - OPTIONAL custom view options
     * @returns {Promise}
     */
    all(customViewOptions) {
        const self = this;
        const promiseCb = (resolve, reject) => {
            self.sequelizeModel
                .findAll(customViewOptions || self.viewOptions)
                .then((rows) => {
                    resolve(rows);
                })
                .catch((err) => {
                    reject(err);
                })
        };
        return new Promise(promiseCb)
    };

    /**
     * Fetch - Get one record by id
     * @param id
     * @param customViewOptions - OPTIONAL
     * @returns {Promise}
     */
    fetch(id, customViewOptions) {
        const self = this;
        const promiseCb = (resolve, reject) => {
            self.sequelizeModel
                .findById(id, customViewOptions || self.viewOptions)
                .then((row) => {
                    if (!row) {
                        throw util.genErr('id not found');
                    }
                    resolve(row);
                })
                .catch((err) => {
                    reject(err);
                })
        };
        return new Promise(promiseCb);
    }

    /**
     * Updates a record by id and data
     * @param id
     * @param data - req.body
     * @returns {Promise}
     */
    update(id, data) {
        const self = this;
        const promiseCb = (resolve, reject) => {
            self.sequelizeModel
                .findById(id)
                .then((row) => {
                    if (!row) {
                        throw util.genErr('id not found');
                    }

                    return self._initBuild(row, data);
                })
                .then((row) => {
                    resolve(row);
                })
                .catch((err) => {
                    reject(err);
                });
        };
        return new Promise(promiseCb);
    }

    /**
     * Create new record using data
     * @param data - should be req.body
     * @param customViewOptions - optional
     * @returns {Promise}
     */
    create(data, customViewOptions) {
        const self = this;
        const currentBuild = self.sequelizeModel.build({});

        const promiseCb = (resolve, reject) => {
            // Note: Empty build needs to be saved or else Sequelize will make a new record on instance.setAssociation();

            self
                ._initBuild(currentBuild, data, customViewOptions)
                .then((comp) => {
                    resolve(comp);
                })
                .catch((err) => {
                    reject(err);
                })
        };
        return new Promise(promiseCb);
    };


    /**
     * Create with a record attached to a parent
     * @param data
     * @param customViewOptions
     */
    createWithParent(data, customViewOptions, parentModel, parentId) {
        const self = this;
        const parentName = parentModel.name;

        const promiseCb = (resolve, reject) => {
            let parentRow;
            // Find the parent object
            parentModel
                .findById(parentId)
                .then((parent) => {
                    if (!parent) {
                        throw util.genErr('no parent found');
                    }
                    parentRow = parent;
                    // Create the new object
                    return self.create(data, customViewOptions)
                })
                .then((row) => {
                    // Attach the foreign key of the parent to the row.
                    return row['set' + parentName](parentRow);
                })
                .then((row) => {
                    return self._getCurrentInstanceById(
                        row[self.primaryKeyString],
                        customViewOptions);
                })
                .then((row) => {
                    resolve(row);
                })
                .catch((err) => {
                    reject(err);
                })
        };

        return new Promise(promiseCb);
    }


    /**
     * Destroy a record by id, sets status to 'inactive'
     * @param id
     * @returns {Promise}
     */
    destroy(id) {
        const promiseCb = (resolve, reject) => {
            this.sequelizeModel.findById(id)
                .then((row) => {
                    if (!row) {
                        throw util.genErr(('id not found'));
                    }

                    // Update the status to inactive.
                    row.status = 'inactive';
                    return row.save();
                })
                .then((row) => {
                    resolve(row);
                })
                .catch((err) => {
                    reject(err);
                });
        };
        return new Promise(promiseCb);
    }


    //========================= PRIVATE METHODS ===========================//

    /**
     * Takes in a sequelize instance and data, updates it with new data then returns it with viewOptions.
     * @param build
     * @param data
     * @returns {Promise}
     */
    _initBuild(build, data, customViewOptions) {
        const self = this;
        const promiseCb = (resolve, reject) => {
            // Build
            self._processBuildCallback(build, data);
            build
                .save()
                .then(() => {
                    return self._processFkCallback(build, data)
                })
                .then(() => {
                    return build.save();
                })
                .then((newRow) => {
                    return self.sequelizeModel.findById(newRow[self.primaryKeyString],
                        customViewOptions || self.viewOptions);
                })
                .then((newRow) => {
                    resolve(newRow);
                })
                .catch((err) => {
                    reject(err);
                });
        };

        return new Promise(promiseCb)
    }

    _getCurrentInstanceById(id, customViewOptions) {
        const self = this;
        return self.sequelizeModel
            .findById(id,
                customViewOptions || self.viewOptions)
    }



    //==================== STATIC METHODS =========================//

    /**
     * For usage within this.dataCallback
     * Will attach a foreign key for a M:1 relationship to the build.
     * Usually listed as a 'belongsTo' relationship in the Sequelize model.
     * @param build
     * @param data
     * @param sqlModel
     * @param customSqlModelName - Used to overwrite the setRelationship method for custom named relationships.
     * @param mutableAsyncArr
     */
    static buildManyToOne(build, data, sqlModel, customSqlModelName, mutableAsyncArr) {
        const modelName = customSqlModelName || sqlModel.name;
        const primaryKeyStr = sqlModel.primaryKeyField;
        // 1. Department FK
        if (data[modelName] != null) {
            const id = data[modelName][primaryKeyStr];

            mutableAsyncArr.push(sqlModel
                .findById(id)
                .then((row) => {
                    if (!row && id){
                        throw util.genErr('Invalid FK value: '
                            + primaryKeyStr
                            + ' not found');
                    }

                    build['set' + modelName](row);
                })
            );
        }
    }
}

module.exports = SequelizeModel;