const getAll = (req, res) => {
  res.send('get all productos')
}

const getOne = (req, res) => {
  res.send('get one producto')
}

const create = (req, res) => {
  res.send('create producto')
}

const edit = (req, res) => {
  res.send('edit producto')
}

const remove = (req, res) => {
  res.send('delete producto')
}

export default {
    getAll,
    getOne,
    create,
    edit,
    remove
}