let mongoose = require('mongoose');
let Rendezvous = mongoose.model('Rendezvous');
const {ObjectID } = require('mongodb')

module.exports = {

    createRdv: (req, res) => {

            Rendezvous.create(req.body, (err, user) => {

                if(err) {
                    res.send('can not add new rendezvous')
                }
                else{
                    res.send('rendezvous added')
                }
            })



    },

    findRdvByDoctor: (req, res) => {
        const id=ObjectID(req.params.id)
        Rendezvous.find({doctor:id}, (err, list) => {
            res.json(list)
        })
    },

    findRdvByDate: (req, res) => {
        Rendezvous.find( { $where: "this.start.substring(0, this.start.indexOf('T')) === '"+req.params.mydate+"'" } ,
            (err, list) => {
            res.json(list)
        }
        )

      },

    findRdvByDateDoctor: (req, res) => {

          Rendezvous.find({start:req.params.myfulldate,doctor:req.params.idDoctor},
              (err, list) => {
              list.push(req.params.idDoctor)
              res.json(list)
          }
              )

    },


    findRdvByDatePatient: (req, res) => {

        Rendezvous.find({start:req.params.myfulldate,patient:req.params.idPatient},
            (err, list) => {
                res.json(list)
            }
        )

    },

    findRdvByPatient: (req, res) => {

        Rendezvous.find({patient:req.params.idPatient},
            (err, list) => {
                res.json(list)
            }
        )

    },

    deleteRDV:(req,res)=>{

        Rendezvous.findOneAndDelete({"_id":req.params.idRDV},(err,data)=>{
            if(err) {
                res.send('not found')
            }
            else{
                res.send('rdv removed')
            }
        })
    }



};
