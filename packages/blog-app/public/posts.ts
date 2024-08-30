import { DateTime, Duration } from 'luxon';
import type { PostCollection } from '@/types';
const today = DateTime.now();
const yesterday = DateTime.now().minus(Duration.fromObject({ days: 1 }));
const lastMonth = DateTime.now().minus(Duration.fromObject({ months: 1 }));

/* Mock data for testing - real data is generated during build */
const posts: PostCollection = [
  {
    title: 'Today post',
    slug: 'today-post',
    createdAt: today,
    modifiedAt: today,
    summary: 'A post written at today',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Yesterday post',
    slug: 'yesterday-post',
    createdAt: yesterday,
    modifiedAt: yesterday,
    summary: 'A post written at yesterday',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Last month post',
    slug: 'last-month-post',
    createdAt: lastMonth,
    modifiedAt: lastMonth,
    summary: 'A post written in last month',
    tags: [ { name: 'C++' }, { name: 'glibc' } ],
    thumbnailUrl: '/logos.jpeg',
  },
  {
    title: 'Today post 2 with no tags',
    slug: 'today-post-2',
    createdAt: lastMonth,
    modifiedAt: lastMonth,
    summary: 'A post written in today',
    tags: [],
    thumbnailUrl: '/logos.jpeg',
  },
]

export default posts;
