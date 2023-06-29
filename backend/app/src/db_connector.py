import mysql.connector
import time

time.sleep(10)

db = mysql.connector.connect(
    host="mysql",
    user="root",
    password="root",
    database="avaliacaounb",
    port="3306"
)
mycursor = db.cursor()



