import express from 'express';
import './db/mongoose.js';
import { Card } from './models/card.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/cards', (req, res) => {
  const card = new Card(req.body);

  card.save().then((card) => {
    res.status(201).send(card);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/cards', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}: {};

  Card.find(filter).then((cards) => {
    if (cards.length !== 0) {
        res.send(cards);
    } else {
        res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });

});

app.get('/cards/:name', (req, res) => {
  const filter = req.params.name? {name: req.params.name.toString()}: {}
  Card.find(filter).then((card) => {
    if (!card) {
      res.status(404).send();
    } else {
      res.send(card);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
  
app.patch('/cards', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'manacost', 'color', 'timeline', 'rarity', 'rules', 'strength', 'loyalty', 'value'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Card.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((card) => {
        if (!card) {
          res.status(404).send();
        } else {
          res.send(card);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

app.patch('/cards/:name', (req, res) => {
  const allowedUpdates = ['name', 'manacost', 'color', 'timeline', 'rarity', 'rules', 'strength', 'loyalty', 'value'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Card.findOneAndUpdate({name: req.params.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    }).then((card) => {
      if (!card) {
        res.status(404).send();
      } else {
        res.send(card);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});


app.delete('/cards', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    Card.findOneAndDelete({name: req.query.name.toString()}).then((card) => {
      if (!card) {
        res.status(404).send();
      } else {
        res.send(card);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});




app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


