import { action, observable } from 'mobx';

import { Post, getPosts } from '../apis/posts.api';

export default class HomeStore {
  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable isLoading: boolean = false;

  @action getPosts = async () => {
    try {
      this.isLoading = true;

      const posts = await getPosts();

      this.posts = posts;
      console.log('succes');
    } catch (error) {
      console.error(error);
      this.posts = [];
    } finally {
      this.isLoading = false;
    }
  };

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 1,
        name: 'jr_acn',
        avatar: 'https://avatars0.githubusercontent.com/u/6952134?s=50',
      },
      authorId: 1,
      description: 'irado',
      id: this.posts.length + 1,
      image: uriPhoto,
    };

    this.posts.unshift(post);
  };

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  };
}

const homeStore = new HomeStore();

export { homeStore };
