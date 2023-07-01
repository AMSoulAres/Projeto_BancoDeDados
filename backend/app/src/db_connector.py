import mysql.connector
import time


tentativas = 0
while True:
    tentativas += 1
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="avaliacaounb",
            port="3306"
        )
        mycursor = db.cursor()
        break
    except mysql.connector.errors.DatabaseError as err:
        print(err)
        time.sleep(5)
        if tentativas == 10:
            break
        pass

