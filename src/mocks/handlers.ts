import {HttpResponse, http} from 'msw';

export const handlers = [
  http.get('http://54.73.73.228:4369/api/images', () => {
    return HttpResponse.json(
      {
        photo_1: {
          index: 1,
          image: 'https://picsum.photos/id/4/200/300',
          description: 'Image 1',
          title: 'Image 1',
        },
      }, {status: 200}
    );
  }),
];
