from backend.app.src.db_connector import mycursor
import mysql.connector.errors as exceptionMySQL


def criar_banco():
    openFile = open("backend\\app\\BDSQL.sql", "r")
    sqlFile = openFile.read()
    openFile.close()

    sqlCommands = sqlFile.split(";")
    mycursor.execute("CREATE DATABASE IF NOT EXISTS avaliacaounb")

    for command in sqlCommands:
        try:
            if not command.strip().startswith("--"):
                print(command)
                mycursor.execute(command)
        except exceptionMySQL.OperationalError as err:
            print(err)