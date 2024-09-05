import { DateTime, Duration } from 'luxon';
import type { PostCollection } from '@/types';
const today = DateTime.utc(2024, 9, 2, 0, 0, 0); // hydration safe
const yesterday = today.minus(Duration.fromObject({ days: 1 }));
const lastMonth = today.minus(Duration.fromObject({ months: 1 }));

/* Mock data for testing - real data is generated during build */
const posts: PostCollection = [
  {
    title: 'A very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long title',
    slug: 'a-very-long-post',
    createdAt: today,
    summary: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Today post',
    slug: 'today-post',
    createdAt: today,
    summary: 'A post written at today',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Yesterday post',
    slug: 'yesterday-post',
    createdAt: yesterday,
    summary: 'A post written at yesterday',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Last month post',
    slug: 'last-month-post',
    createdAt: lastMonth,
    summary: 'A post written in last month',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Today post 2 with no tags',
    slug: 'today-post-2',
    createdAt: lastMonth,
    summary: 'A post written in today',
    tags: [],
    thumbnailUrl: '/logos.jpeg',
  },
]

export default posts;
