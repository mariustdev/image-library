import {expect, test} from 'vitest';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import {GalleryState} from "../../commons/interfaces/GalleryState.ts";
import {renderWithProviders} from "../../utils/test-utils.tsx";
import GalleryPage from "./GalleryPage.tsx";
import {ERROR_NO_IMAGES, ERROR_OLD_IMAGES} from "../../commons/constants/Constants.ts";
import {server} from "../../mocks/server.ts";
import {http, HttpResponse} from "msw";
import {act} from "react";

const initialState: GalleryState = {
  images: [],
  activeImageIndex: -1,
  loading: false,
  errors: undefined,
};

test('renders loading state', () => {
  renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {...initialState, loading: true},
    },
  });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders error state when no images', async () => {
  server.use(
    http.get('http://54.73.73.228:4369/api/images', () => {
      return HttpResponse.json({
        message: 'Something went wrong',
      }, {status: 400})
    })
  );

  renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {...initialState},
    },
  });

  await waitFor(() => expect(screen.getByText(ERROR_NO_IMAGES)).toBeInTheDocument());
});

test('renders error state when old images', async () => {
  server.use(
    http.get('http://54.73.73.228:4369/api/images', () => {
      return HttpResponse.json({
        message: 'Something went wrong',
      }, {status: 400})
    })
  );

  renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {
        ...initialState, images: [
          {
            index: 1,
            image: 'https://picsum.photos/id/4/200/300',
            description: 'Image 1',
            title: 'Image 1',
          }
        ]
      },
    },
  });

  await waitFor(() => expect(screen.getByText(ERROR_OLD_IMAGES)).toBeInTheDocument());
});

test('renders 1 image', async () => {
  renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {...initialState},
    },
  });

  // From handler ts I know exactly that I will receive 1 image
  await waitFor(() => expect(screen.getByTestId('image-1')).toBeInTheDocument());
});

test('click image will add active class', async () => {
  const gallery = renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {...initialState},
    },
  });

  const imageCard = await gallery.findByTestId('image-1');

  await act(async () => {
    await imageCard.click();
  });

  expect(imageCard).toHaveClass('active');
});

test('render fallback image when no image', async () => {
  server.use(
    http.get('http://54.73.73.228:4369/api/images', () => {
      return HttpResponse.json(
        {
          photo_1: {
            index: 1,
            image: '',
            description: 'Image 1',
            title: 'Image 1',
          },
        }, {status: 200}
      );
    })
  );

  const gallery = renderWithProviders(<GalleryPage/>, {
    preloadedState: {
      gallery: {...initialState},
    },
  });
  const imageCard = await gallery.findByTestId('image-1');
  const image = imageCard.getElementsByTagName('img')[0];

  // firing event to trigger image error on loading
  fireEvent.error(image);

  expect(image.src).toMatch(/no-image\.jpg$/);
});
