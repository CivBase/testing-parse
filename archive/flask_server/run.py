"""
Start up the server on localhost.
"""
from app import app
from config import DEBUG


def main():
    app.run(debug=DEBUG)


if __name__ == "__main__":
    main()
