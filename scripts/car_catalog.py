import argparse
import re
from termcolor import cprint
import json
import shutil

users_path = '../src/data/users.json'
original_users_path = '../src/data/original/users.json'
cars_path = '../src/data/cars.json'
original_cars_path = '../src/data/original/cars.json'


def car_catalog():
    parser = argparse.ArgumentParser(description='Car catalog')

    parser.add_argument('-a', '--add', action='store_true', help='Add a new user')
    parser.add_argument('-d', '--delete', type=int, metavar='ID', help='Delete user with ID')
    parser.add_argument('-r', '--restore', action='store_true', help='Restore all the data')

    args = parser.parse_args()

    if args.add:
        add_new_user()
    elif args.delete:
        delete_user(args.delete)
    elif args.restore:
        restore_original_data()
    else:
        return


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

    with open(users_path, 'r') as file:
        users_data = json.load(file)
        new_id = users_data['usuarios'][-1]['id'] + 1
        new_user = {
            'id': new_id,
            'name': username,
            'email': email,
            'coches_favoritos': []
        }
        users_data['usuarios'].append(new_user)

        with open(users_path, 'w') as write_file:
            json.dump(users_data, write_file, indent=4)

            cprint("New user added successfully!", "green")
            print("ID: ", new_user['id'])
            print("Username: ", new_user['name'])
            print("Email: ", new_user['email'])
            print("Favorite cars: ", new_user['coches_favoritos'])


def delete_user(user_id):
    print('Deleting the user with the ID ' + str(user_id) + "...")

    with open(users_path, 'r') as file:
        users_data = json.load(file)

    deleted_user = None
    for user in users_data['usuarios']:
        if user['id'] == user_id:
            deleted_user = user
            break

    if deleted_user is not None:
        users_data['usuarios'].remove(deleted_user)

        with open(users_path, 'w') as write_file:
            json.dump(users_data, write_file, indent=4)

        cprint("User deleted successfully!", "green")
    else:
        cprint("User with ID " + user_id + " not found.", "red")


def restore_original_data():
    shutil.copy(original_users_path, users_path)
    shutil.copy(original_cars_path, cars_path)
    print("Original JSON files have been restored.")


if __name__ == '__main__':
    car_catalog()
