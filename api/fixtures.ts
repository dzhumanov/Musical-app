import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ["artists", "albums", "tracks"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [LilPeep, Joji, Kino] = await Artist.create(
    {
      name: "Lil Peep",
      info: "Depressed Emo Rap",
      photo: "fixtures/lilpeep.jpg",
    },
    {
      name: "Joji",
      info: "Alternative Indie",
      photo: "fixtures/joji.png",
    },
    {
      name: "Gruppa Kino",
      info: "Rock",
      photo: "fixtures/kino.jpg",
    }
  );

  const [crybaby, HELLBOY, Ballads, SMITHEREENS, Legend, StarNamedSun] =
    await Album.create(
      {
        name: "crybaby",
        artist: LilPeep,
        date: 2016,
        image: "fixtures/crybaby.jpg",
      },
      {
        name: "HELLBOY",
        artist: LilPeep,
        date: 2018,
        image: "fixtures/hellboy.jpg",
      },
      {
        name: "Ballads 1",
        artist: Joji,
        date: 2018,
        image: "fixtures/Ballads.png",
      },
      {
        name: "SMITHEREENS",
        artist: Joji,
        date: 2022,
        image: "fixtures/Smithereens.png",
      },
      {
        name: "Легенда",
        artist: Kino,
        date: 2018,
        image: "fixtures/legend.jpg",
      },
      {
        name: "Звезда по имени Солнце",
        artist: Kino,
        date: 1986,
        image: "fixtures/starnamedSun.jpg",
      }
    );

  await Track.create(
    {
      name: "crybaby",
      album: crybaby,
      duration: "4:07",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=inocgEraxo0",
    },
    {
      name: "lil jeep",
      album: crybaby,
      duration: "3:23",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=zUPPrimH7Ow",
    },
    {
      name: "yesterday",
      album: crybaby,
      duration: "1:52",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=fqWGiOoNnic&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=3",
    },
    {
      name: "absolute in doubt",
      album: crybaby,
      duration: "3:47",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=ndwtbCYz9m8&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=4",
    },
    {
      name: "ghost girl",
      album: crybaby,
      duration: "2:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=IaHSxjanQtI&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=5",
    },
    {
      name: "hellboy",
      album: HELLBOY,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=xLnhtTlwjak",
    },
    {
      name: "worlds away",
      album: HELLBOY,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=rV0UwlwYTh0",
    },
    {
      name: "girls",
      album: HELLBOY,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=3hlSgENWCcU",
    },
    {
      name: "walk away as the door slams",
      album: HELLBOY,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=ovvZ2f6ipXw",
    },
    {
      name: "fucked up",
      album: HELLBOY,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=cpSH_SzOfM0",
    },

    {
      name: "ATTENTION",
      album: Ballads,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=ulMHhPHYCi0",
    },
    {
      name: "SLOW DANCING IN THE DARK",
      album: Ballads,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=K3Qzzggn--s",
    },
    {
      name: "TEST DRIVE",
      album: Ballads,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=PEBS2jbZce4",
    },
    {
      name: "YEAH RIGHT",
      album: Ballads,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=tG7wLK4aAOE",
    },
    {
      name: "XNXX",
      album: Ballads,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=iBUnToeuY18",
    },
    {
      name: "Glimpse of Us",
      album: SMITHEREENS,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=FvOpPeKSf_4",
    },
    {
      name: "Die for You",
      album: SMITHEREENS,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=kIEWJ1ljEro",
    },
    {
      name: "1AM FREESTYLE",
      album: SMITHEREENS,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=QTxMAycHnos",
    },
    {
      name: "Dissolve",
      album: SMITHEREENS,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=8RrmAIacu64",
    },
    {
      name: "Before the day is over",
      album: SMITHEREENS,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=UnzFVZ7jMN0",
    },
    {
      name: "Кукушка",
      album: Legend,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=Ra0ozaE-oy0",
    },
    {
      name: "Группа крови",
      album: Legend,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=xKpzH5bxYsk",
    },
    {
      name: "Красно-желтые дни",
      album: Legend,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=N_KQ9oDp0-c",
    },
    {
      name: "Последний герой",
      album: Legend,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=BnDY4jC7JZM",
    },
    {
      name: "Восьмиклассница",
      album: Legend,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=w5jU_lVQt4o",
    },
    {
      name: "Звезда по имени Солнце",
      album: StarNamedSun,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=jQV5VXfKDYc",
    },
    {
      name: "Пачка сигарет",
      album: StarNamedSun,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=v0uSOjnRm3U",
    },
    {
      name: "Апрель",
      album: StarNamedSun,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=wKxYPPXwZQQ",
    },
    {
      name: "Сказка",
      album: StarNamedSun,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=yvEdaXzKSOY",
    },
    {
      name: "Печаль",
      album: StarNamedSun,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=UKQW3SSqAxw",
    }
  );

  await db.close();
};

void run();
