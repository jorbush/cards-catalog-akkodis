import argparse


def car_catalog():

    parser = argparse.ArgumentParser(description='Car catalog')

    parser.add_argument('-a', '--add', type=str, help='Add a new user')
    parser.add_argument('-d', '--delete', type=str, help='Delete user with ID')

    args = parser.parse_args()

    if args.add:
        print('Add:', args.add)
    if args.delete:
        print('Delete:', args.delete)


if __name__ == '__main__':
    car_catalog()