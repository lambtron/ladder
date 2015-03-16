# Ladder

> Elo ranking web app.

## Installing

Required technologies:
- node 0.12.x
- mongo
- browserify

```
$ git clone https://github.com/lambtron/ladder.git
$ cd ladder
$ mongod
$ make
```

## Deploy to Heroku

After you have cloned and went into the root of the directory:

```
$ heroku create
$ git push heroku master
$ heroku addons:add mongolab
$ heroku open
```

## Usage

### API Routes

#### GET /api/list

Get the list of all players in the database.

```javascript
```

#### POST /api/create

Create a new player in the database. Content-type is application/json with sample body below.

```javascript
{
  name: 'BeastLee'
}
```

#### POST /api/results

Create a new game result and update Elo ratings accordingly. Content type is application/json with sample body below.

```javascript
{
  winner: 'BeastLee',
  loser: 'DinnerNugget'
}
```

#### POST /api/remove/:name

Remove player from database with `name` as the key. The name is case sensitive.

## License (MIT)

    WWWWWW||WWWWWW
     W W W||W W W
          ||
        ( OO )__________
         /  |           \
        /o o|    MIT     \
        \___/||_||__||_|| *
             || ||  || ||
            _||_|| _||_||
           (__|__|(__|__|

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.