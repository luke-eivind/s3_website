import logo from './logo.svg';
import './App.css';
import aws from 'aws-sdk';
import { useState, useEffect } from 'react'


let s3

function App() {

  const [games, setGames] = useState()
  const [gameList, setGameList] = useState()

  useEffect(() => {
    getGamesFromS3()
  }, []);

  useEffect(()=>{
    if(games != null){
      // let gl = '<img src="' + games['games'][0]['image'] + '"/>'
      // setGameList(gl)
      createTable()
      console.log(games['games'][0])
    }
  }, [games])

  const getGamesFromS3 = async() => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    let params = {
      Bucket: 'lukefreeman4231',
      Key: today + '/top_sellers.json'
    }

    let o = await s3.getObject(params, async function(err,data){
      //console.log(JSON.parse(new TextDecoder().decode(data.Body))['games'])
      setGames(JSON.parse(new TextDecoder().decode(data.Body)))
    })
    //console.log(o.data)
    return o
  }


// Create an S3 client
  s3 = new aws.S3({
    region: 'eu-central-1',
    accessKeyId: 'AKIASMDK4BQY7GZOCHLC',
    secretAccessKey: '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'
  });

// Create a bucket and upload something into it





  const createTable = () => {
    let table = '<table><tbody>'
    games['games'].forEach(e => {
      table += '<tr><td><a href="' + e['game_link'] + '"><img src="' + e['image'] + '"/></a></td>'
      table += '<td>' + e['title'] + '</td>'
      table += '<td>' + e['price'] + '</td></tr>'
    })
    table += '</tbody></table>'
    setGameList(table)
  }


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div class='table-container'>
        <h1>Steam Top Sellers</h1>
        <div dangerouslySetInnerHTML={{__html: gameList}}>
        </div>
      </div>
    </div>
  );
}

export default App;
