import mysql.connector.errors as exceptionMySQL
import mysql.connector

db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root"
    )

cursorCriaDB = db.cursor()

def criar_banco():
    openFile = open("./BDSQL.sql", "r")
    sqlFile = openFile.read()
    openFile.close()

    sqlCommands = sqlFile.split(";")
    cursorCriaDB.execute("CREATE DATABASE IF NOT EXISTS AvaliacaoUNB")

    dbCriado = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="avaliacaounb"
    )

    cursorDBCriado = dbCriado.cursor()

    for command in sqlCommands:
        try:
            if not command.strip().startswith("--"):
                print(command)
                cursorDBCriado.execute(command)
        except exceptionMySQL.OperationalError as err:
            print(err)