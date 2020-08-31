const
    dotenv = require('dotenv').load(),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    uploader = require('express-fileupload');

mongoose = require('mongoose'),

    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CodeWarriors',
    port = process.env.PORT || 3000,//set PORT=5000
    Task = require('./src/models/todoListModel'),//created model loading here
    Medicament = require('./src/models/pharmacie/medicamentModel'),//created model loading here
    Ordonnance = require('./src/models/pharmacie/ordonnanceModel'),//created model loading here
    Lit = require('./src/models/ressourceMaterielles/litModel'),//created model loading here
    Sejour = require('./src/models/ressourceMaterielles/sejourModel'),//created model loading here
    Chambre = require('./src/models/ressourceMaterielles/chambreModel'),//created model loading here
    usersRoutes = require('./src/models/userModel'),//created model loading here
    coordinateRoutes = require('./src/models/ambulance/coordinateModel'),//created model loading here
    PhoneCallsRoutes = require('./src/models/ambulance/PhoneCallsModel'),//created model loading here
    taskRoutes = require('./src/models/ambulance/taskModel'),//created model loading here
    rdv = require('./src/models/patient/rendezvousModel'),//created model loading here
    cors = require('cors'),
    whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3006', 'http://localhost:19003'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};
const userRoute = require('./src/routes/userRoutes').route;
const staffRoute = require('./src/routes/HRH/StaffRoutes');
const trainingRouter = require('./src/routes/HRH/trainingRoutes');
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
});
socketServer = require('./src/socket')(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(uploader());
app.use(logger('dev'));
app.use(cors());
require('./src/security/passport')(passport);
app.use('/users', userRoute);
app.use('/staff', staffRoute);
app.use('/training', trainingRouter);
app.use('/schedule', require('./src/routes/HRH/ScheduleRoute'));
app.use('/department', require('./src/routes/HRH/DepartmentRoutes'));
app.use('/appointment', require('./src/routes/HRH/AppointmentRoute'));
var routesAMB5 = require('./src/routes/ambulance/PhoneCallsRoutes.js'); //importing route
var routesAMB4 = require('./src/routes/ambulance/coordinateRoutes.js'); //importing route
var routesAMB3 = require('./src/routes/ambulance/taskRoutes.js'); //importing route

var routes2 = require('./src/routes/userRoutes.js').userRoute; //importing route
var routes = require('./src/routes/todoListRoutes'); //importing route
var routes3 = require('./src/routes/pharmacie/medicamentRoutes'); //importing route
var routes4 = require('./src/routes/pharmacie/ordonnanceRoutes'); //importing route
var routes5 = require('./src/routes/ressourcesMaterielles/litRoutes'); //importing route
var routes6 = require('./src/routes/ressourcesMaterielles/sejourRoutes'); //importing route
var routes7 = require('./src/routes/ressourcesMaterielles/chambreRoutes'); //importing route
routesAMB3(app);// route for tasks
routesAMB4(app);// route for coordinate
routesAMB5(app);// route for ambulance
routes7(app);
routes6(app);
routes5(app);
routes4(app);
routes3(app);
var routesRDV = require('./src/routes/patient/rendezvousRoutes');
routesRDV(app);

routes(app); //register the route
routes2(app);


app.listen(port, () => console.log(`Listenning on port ${port}...`));


