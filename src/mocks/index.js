import faker from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';

export default async () => {
    try {
        await Tweet.deleteMany();
        await User.deleteMany();

        await Array.from({ length: 3 }).forEach(async (_, index) => {
            // Creating mock user accounts
            const user = await User.create({
                username: faker.internet.userName(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: 'password123',
                profile: `https://randomuser.me/api/portraits/men/${index}.jpg`
            });

            // Creating mock tweets
            await Array.from({ length: 3 }).forEach(async () => {
                await Tweet.create({ text: faker.lorem.lines(1), user: user._id });
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};
