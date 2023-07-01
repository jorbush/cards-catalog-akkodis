import argparse
import re
from termcolor import cprint


def car_catalog():
    parser = argparse.ArgumentParser(description='Car catalog')

    parser.add_argument('-a', '--add', action='store_true', help='Add a new user')
    parser.add_argument('-d', '--delete', type=str, metavar='ID', help='Delete user with ID')

    args = parser.parse_args()

    if args.add:
        add_new_user()
    if args.delete:
        delete_user(args.delete)


def add_new_user():
    print('You have selected to add a new user.')
    username = input("Enter the username (maximum 10 letters): ")
    email = input("Enter the email address: ")

    while not re.match(r'^.{0,10}$', username):
        cprint("Error: The username should not exceed 10 letters.", "red")
        username = input("Enter the username (maximum 10 letters): ")

    while not re.match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', email):
        cprint("Error: Invalid email address format.", "red")
        email = input("Enter the email address: ")

    cprint("New user added successfully!", "green")
    print("Username:", username)
    print("Email:", email)


def delete_user(user_id: str):
    print('Deleting the user with the ID ' + user_id + "...")


if __name__ == '__main__':
    car_catalog()
