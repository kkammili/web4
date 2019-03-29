// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const http = require('http')
// const cors = require('cors')
//
// //mongodb related
// const db = require('./model/db')
// const user = require('./routes/user');
// const project = require('./routes/project')
//
//
// //sample express mock
// const index = require('./routes/index');
// const git = require('./routes/git')
//
//
// const app = express();
//
// // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
//
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
//
// // adding cors interceptor to express
// app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
//
//
//
//
// app.use('/', index);
// app.use('/git', git)
//
//
// app.use('/mongoUser', user);
// app.use('/mongoProject', project)
//
//
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
//
// const port = process.env.PORT || 3000
// app.set('port', port)
//
// const server = http.createServer(app)
// app.listen(port, ()=>{
//   console.log(`express server running on port localhost:${port}/`)
// });
