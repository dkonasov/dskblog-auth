import { connect } from 'mongoose';
import { UserModel } from './models/user.model';
import { User } from './interfaces/user';
import { CredentialsModel } from './models/credentials.model';

connect(process.env.DSKBLOG_MONGO_URL)
.then(() => {
    console.log(`Connected to MongoDB server at ${process.env.DSKBLOG_MONGO_URL}`);
    UserModel.findOne({
        username: 'admin'
    })
    .then((user: User) => {
        let promise: Promise<unknown>;
        if (!user) {
            promise = new Promise((
                resolve,
                reject
            ) => {
                const newUser = new UserModel({
                    username: 'admin'
                });
                newUser.save()
                .then((createdUser: User) => {
                    const credentials = new CredentialsModel({
                        user: createdUser.id,
                        password: process.env.DSKBLOG_DEFAULT_ADMIN_PASSWORD
                    });
                    credentials.save()
                    .then(() => resolve(null))
                    .catch(err => reject(err));
                })
                .catch((err: Error) => {
                    reject(err);
                })
            });
        } else {
            promise = Promise.resolve();
        }
        promise.then(() => {
            // TODO: start server
        })
        .catch((err: Error) => {
            console.log('Error while creating a user');
            console.error(err);
        });
    })
    .catch((err: Error) => {
        console.log('Error while retrieving a user');
        console.error(err);
    });
})
.catch((err: Error) => {
    console.log('Mongo error');
    console.error(err);
})