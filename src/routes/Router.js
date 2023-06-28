const express = require('express')
const router = express.Router()

const CustomerController = require('../controllers/CustomerController');
const LoginController = require('../controllers/LoginController');
const CalendarController = require('../controllers/CalendarController');

// Login
router.post('/login/register', LoginController.Post)
router.post('/login', LoginController.User)
router.get('/login/:uuid', LoginController.searchRegister)

//clientes
router.get('/customer', CustomerController.Get)
router.get('/customer/:uuid', CustomerController.searchRegister)
router.post('/customer', CustomerController.Post)
router.put('/customer/:uuid', CustomerController.Put)

//Calendário
router.get('/calendar',CalendarController.Get)
router.get('/calendar/:uuid',CalendarController.searchRegister)
router.post('/calendar',CalendarController.Post)
router.put('/calendar/:uuid',CalendarController.Put)

module.exports = router