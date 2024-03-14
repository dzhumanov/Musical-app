import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

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

  const collections = ["artists", "albums", "tracks", "users"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create(
    {
      email: "admin@spotify.local",
      password: "123321",
      role: "admin",
      token: crypto.randomUUID(),
    },
    {
      email: "defaultUser@spotify.local",
      password: "123321",
      token: crypto.randomUUID(),
    }
  );

  const [LilPeep, Joji, Kino, KanyeWest] = await Artist.create(
    {
      name: "Lil Peep",
      info: "Depressed Emo Rap",
      photo: "fixtures/lilpeep.jpg",
      isPublished: true,
    },
    {
      name: "Joji",
      info: "Alternative Indie",
      photo: "fixtures/joji.png",
      isPublished: true,
    },
    {
      name: "Gruppa Kino",
      info: "Rock",
      photo: "fixtures/kino.jpg",
      isPublished: true,
    },
    {
      name: "Kanye West",
      info: "Rap",
      photo: "fixtures/west.webp",
      isPublished: false,
    }
  );

  const [
    crybaby,
    HELLBOY,
    Ballads,
    SMITHEREENS,
    Legend,
    StarNamedSun,
    WestAlbum,
  ] = await Album.create(
    {
      name: "crybaby",
      artist: LilPeep,
      date: 2016,
      image: "fixtures/crybaby.jpg",
      isPublished: true,
    },
    {
      name: "HELLBOY",
      artist: LilPeep,
      date: 2018,
      image: "fixtures/hellboy.jpg",
      isPublished: true,
    },
    {
      name: "Ballads 1",
      artist: Joji,
      date: 2018,
      image: "fixtures/Ballads.png",
      isPublished: true,
    },
    {
      name: "SMITHEREENS",
      artist: Joji,
      date: 2022,
      image: "fixtures/Smithereens.png",
      isPublished: true,
    },
    {
      name: "Легенда",
      artist: Kino,
      date: 2018,
      image: "fixtures/legend.jpg",
      isPublished: true,
    },
    {
      name: "Звезда по имени Солнце",
      artist: Kino,
      date: 1986,
      image: "fixtures/starnamedSun.jpg",
      isPublished: true,
    },
    {
      name: "My beautiful Dark Twisted Fantasy",
      artist: KanyeWest,
      date: 2010,
      image: "fixtures/dark.jpg",
      isPublished: false,
    }
  );

  await Track.create(
    {
      name: "crybaby",
      album: crybaby,
      duration: "4:07",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=inocgEraxo0",
      isPublished: true,
    },
    {
      name: "lil jeep",
      album: crybaby,
      duration: "3:23",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=zUPPrimH7Ow",
      isPublished: true,
    },
    {
      name: "yesterday",
      album: crybaby,
      duration: "1:52",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=fqWGiOoNnic&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=3",
      isPublished: true,
    },
    {
      name: "absolute in doubt",
      album: crybaby,
      duration: "3:47",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=ndwtbCYz9m8&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=4",
      isPublished: true,
    },
    {
      name: "ghost girl",
      album: crybaby,
      duration: "2:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=IaHSxjanQtI&list=PLT_N8wVy0sP-9fGiG4MAeCVft4EBcRBIE&index=5",
      isPublished: true,
    },
    {
      name: "hellboy",
      album: HELLBOY,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=xLnhtTlwjak",
      isPublished: true,
    },
    {
      name: "worlds away",
      album: HELLBOY,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=rV0UwlwYTh0",
      isPublished: true,
    },
    {
      name: "girls",
      album: HELLBOY,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=3hlSgENWCcU",
      isPublished: true,
    },
    {
      name: "walk away as the door slams",
      album: HELLBOY,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=ovvZ2f6ipXw",
      isPublished: true,
    },
    {
      name: "fucked up",
      album: HELLBOY,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=cpSH_SzOfM0",
      isPublished: true,
    },

    {
      name: "ATTENTION",
      album: Ballads,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=ulMHhPHYCi0",
      isPublished: true,
    },
    {
      name: "SLOW DANCING IN THE DARK",
      album: Ballads,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=K3Qzzggn--s",
      isPublished: true,
    },
    {
      name: "TEST DRIVE",
      album: Ballads,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=PEBS2jbZce4",
      isPublished: true,
    },
    {
      name: "YEAH RIGHT",
      album: Ballads,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=tG7wLK4aAOE",
      isPublished: true,
    },
    {
      name: "XNXX",
      album: Ballads,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=iBUnToeuY18",
      isPublished: true,
    },
    {
      name: "Glimpse of Us",
      album: SMITHEREENS,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=FvOpPeKSf_4",
      isPublished: true,
    },
    {
      name: "Die for You",
      album: SMITHEREENS,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=kIEWJ1ljEro",
      isPublished: true,
    },
    {
      name: "1AM FREESTYLE",
      album: SMITHEREENS,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=QTxMAycHnos",
      isPublished: true,
    },
    {
      name: "Dissolve",
      album: SMITHEREENS,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=8RrmAIacu64",
      isPublished: true,
    },
    {
      name: "Before the day is over",
      album: SMITHEREENS,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=UnzFVZ7jMN0",
      isPublished: true,
    },
    {
      name: "Кукушка",
      album: Legend,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=Ra0ozaE-oy0",
      isPublished: true,
    },
    {
      name: "Группа крови",
      album: Legend,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=xKpzH5bxYsk",
      isPublished: true,
    },
    {
      name: "Красно-желтые дни",
      album: Legend,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=N_KQ9oDp0-c",
      isPublished: true,
    },
    {
      name: "Последний герой",
      album: Legend,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=BnDY4jC7JZM",
      isPublished: true,
    },
    {
      name: "Восьмиклассница",
      album: Legend,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=w5jU_lVQt4o",
      isPublished: true,
    },
    {
      name: "Звезда по имени Солнце",
      album: StarNamedSun,
      duration: "2:44",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=jQV5VXfKDYc",
      isPublished: true,
    },
    {
      name: "Пачка сигарет",
      album: StarNamedSun,
      duration: "2:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=v0uSOjnRm3U",
      isPublished: true,
    },
    {
      name: "Апрель",
      album: StarNamedSun,
      duration: "3:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=wKxYPPXwZQQ",
      isPublished: true,
    },
    {
      name: "Сказка",
      album: StarNamedSun,
      duration: "4:33",
      trackNumber: 4,
      link: "https://www.youtube.com/watch?v=yvEdaXzKSOY",
      isPublished: true,
    },
    {
      name: "Печаль",
      album: StarNamedSun,
      duration: "1:53",
      trackNumber: 5,
      link: "https://www.youtube.com/watch?v=UKQW3SSqAxw",
      isPublished: true,
    },
    {
      name: "Runaway",
      album: WestAlbum,
      duration: "1:53",
      trackNumber: 1,
      link: "https://www.youtube.com/watch?v=zhlP4lgDGGA&list=PLklvWcXoAxKiJGaLhcHFZ1OPC5eKKpYB_&index=9",
      isPublished: false,
    },
    {
      name: "Power",
      album: WestAlbum,
      duration: "1:53",
      trackNumber: 2,
      link: "https://www.youtube.com/watch?v=MHhTgNgEzKQ&list=PLklvWcXoAxKiJGaLhcHFZ1OPC5eKKpYB_&index=3",
      isPublished: false,
    },
    {
      name: "Hell of a life",
      album: WestAlbum,
      duration: "1:53",
      trackNumber: 3,
      link: "https://www.youtube.com/watch?v=QvImAiU04Ag&list=PLklvWcXoAxKiJGaLhcHFZ1OPC5eKKpYB_&index=10",
      isPublished: false,
    }
  );

  await db.close();
};

void run();
