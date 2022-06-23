const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(550);

app.get('/getbookname', (req, resp) => {
    console.log("ajax function called");
    const dbobject = {
        host: 'localhost',
        user: 'root',
        password: 'cdac',
        database: 'college',
        port: 3306
    }

    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail:{ book1: 0, bookname:"", price: 0}}

    let bookid=req.query.bookid;
    console.log(bookid);
    conn.query('select bookname from book where bookid=?',[bookname],
    (error, rows) =>
    {
        if (error)
        {
            console.log(error);
        }
        else{
            if(rows.length > 0)
            {
                output.status = true;
                output.detail = rows[0];
            }
            else{
                console.log("No book is there");
            }
        }
        console.log(output);
        resp.send(output);
    });

    app.get('/updatebookname', (req, resp) =>{
        console.log("ajax function called");
        const dbobject = {
            host:'localhost',
            user: 'root',
            password: 'cdac',
            database: 'college',
            port:3306
        }

        const conn = mysql.createConnection(dbobject);

        let output = { status: false}
        let book1 =req.query.bookid;

        let bookname = req.query.bookname;
        console.log(book1);

        conn.query('update book set bookname = ? where bookid = ?', [bookid, bookname, book1],
        (error, res) =>{
            if (error){
                console.log(error);

            }
            else{
                if( res.affectedRows > 0)
                {
                    output.status = true;
                }
                else{
                    console.log("not updated");
                }
            }
            console.log(output);
            res.send(output);
        });
    });
    


})