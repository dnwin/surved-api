/**
 * Created by dennis on 5/13/16.
 */

// catch 404 and forward to error handler

const forward404 = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

module.exports = {
    middleware: forward404
};