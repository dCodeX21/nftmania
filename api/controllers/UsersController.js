const Users = require('../models/Users')

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await Users.find()
    res.json(allUser)
  } catch (err) {
    res.status(400).json({ err: err })
  }
  // } catch (exception) {
  //   throw new Error(exception.message)
  // }
}

exports.getUserByAddress = async (req, res) => {
  try {
    const stringToFind = req.params.address;

    const regexString = new RegExp(["^", stringToFind.toLowerCase(), "$"].join(""), "i");
    
    const userByAddress = await Users.findOne({ address : regexString })
      // .collation({ locale: 'en', strength: 2 })

    if (userByAddress) {
      const result = {
        'id': userByAddress._id,
        'address': userByAddress.address
      }
      res.send(result)
    } else {
      res.json({ message: 'User Not Found'})
    }
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

exports.registerNewUser = async (req, res) => {
  try {
    const newUser = new Users({
      address: req.body.newAddress
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

// // Delete a todo by id
// router.delete('/delete/:id', async (req, res) => {
//   const tDelete = await Todo.findByIdAndDelete({ _id : req.params.id })
//   res.json(tDelete)
// })

// // Update a todo by id
// router.put('/update/:id', async (req, res) => {
//   const tUpdate = await Todo.updateOne(
//     { _id: req.params.id }, 
    
//     { $set: req.body }
//    /*  {
//       author: "Bart",
//       todo: "Skating"
//     } */
//   )
//   res.json(tUpdate)
// })
