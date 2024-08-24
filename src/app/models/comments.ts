import { faker } from '@faker-js/faker';

export interface commentType {
    name: string,
    comment: string,
    likes: number,
    dislikes: number,
    img: string
}

export const comments: commentType[] = [
    {
      name: faker.person.fullName(),
      comment: 'This platform is so good, even my cat started visualizing data!',
      likes: 10,
      dislikes: 1,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'Finally, a data visualization tool that doesn’t make me want to throw my computer out the window!',
      likes: 20,
      dislikes: 1,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'I used this platform once, and now my plants are thriving. Coincidence? I think not!',
      likes: 15,
      dislikes: 2,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'This platform cured my hair loss. Now, I have a full head of data!',
      likes: 30,
      dislikes: 0,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'Ever since I started using this, my dog has learned how to fetch data!',
      likes: 22,
      dislikes: 3,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'This is better than a cup of coffee for waking up my brain cells!',
      likes: 18,
      dislikes: 1,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'I showed this to my grandma, and now she’s a data scientist!',
      likes: 25,
      dislikes: 2,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'Who needs meditation when you have this platform? Stress-free data analysis!',
      likes: 40,
      dislikes: 1,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'I used this once, and now my computer is applying for jobs!',
      likes: 32,
      dislikes: 0,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'The only side effect of using this platform is an uncontrollable urge to analyze everything!',
      likes: 27,
      dislikes: 3,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'This platform is the reason why I now believe in miracles!',
      likes: 35,
      dislikes: 1,
      img: faker.image.avatar(),
    },
    {
      name: faker.person.fullName(),
      comment: 'After using this, I’m convinced it can predict the future. It’s that good!',
      likes: 29,
      dislikes: 1,
      img: faker.image.avatar(),
    },
  ];
  