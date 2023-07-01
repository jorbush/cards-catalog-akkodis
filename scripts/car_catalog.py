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
    parser.add_argument('-d', '--delete', type=int, metavar='[id]', help='Delete user with ID')
    parser.add_argument('-r', '--restore', action='store_true', help='Restore all the data')
    parser.add_argument('-ac', '--add_car', type=int, nargs=2, metavar='[car_id] [user_id]',
                        help='The car with ID ( [car_id] '
                             ') will be added as a '
                             'favorite to the user with '
                             'ID ( [user_id] ).')
    parser.add_argument('-dc', '--delete_car', type=int, nargs=2, metavar='[car_id] [user_id]',
                        help='The car with ID ( [car_id] '
                             ') will be deleted as a '
                             'favorite to the user with '
                             'ID ( [user_id] ).')

    args = parser.parse_args()

    if args.add:
        add_new_user()
    elif args.delete:
        delete_user(args.delete)
    elif args.restore:
        restore_original_data()
    elif args.add_car:
        add_car_user(args.add_car)
    elif args.delete_car:
        delete_car_user(args.delete_car)
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

    if users_data is not None:
        with open(users_path, 'w') as write_file:
            json.dump(users_data, write_file, indent=4)

            cprint("New user added successfully!", "green")
            print("ID: ", new_user['id'])
            print("Username: ", new_user['name'])
            print("Email: ", new_user['email'])
            print("Favorite cars: ", new_user['coches_favoritos'])
    else:
        cprint("Something goes wrong while reading JSON file.", "red")


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
        cprint("User with ID " + str(user_id) + " not found.", "red")


def restore_original_data():
    shutil.copy(original_users_path, users_path)
    shutil.copy(original_cars_path, cars_path)
    print("Original JSON files have been restored.")


def add_car_user(ids):
    car_id = ids[0]
    user_id = ids[1]

    print('Adding car with ID ' + str(car_id) + ' as a favorite to the user with ID ' + str(user_id))

    favorite_car = None
    update_user = None

    with open(cars_path, 'r') as file:
        cars_data = json.load(file)

    for car in cars_data['coches']:
        if car['id'] == car_id:
            favorite_car = car
            break

    with open(users_path, 'r') as file:
        users_data = json.load(file)

    for user in users_data['usuarios']:
        if user['id'] == user_id:
            update_user = user
            break

    if favorite_car is None:
        cprint("Car with ID " + str(car_id) + " not found.", "red")
        return

    if update_user is None:
        cprint("User with ID " + str(user_id) + " not found.", "red")
        return

    print(favorite_car)
    print(update_user)


def delete_car_user(ids):
    print(ids)


if __name__ == '__main__':
    car_catalog()
