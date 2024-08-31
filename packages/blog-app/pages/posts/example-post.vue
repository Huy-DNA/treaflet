<template>
  <article class='post'>
    <h1 class='post__title'>
      {{ post.title }}
    </h1>
    <p class='post__date'>
      {{ createdAt }}
    </p>
    <main v-html="post.content" />
  </article>
</template>

<script setup lang="ts">
  import { DateTime } from 'luxon';
  import type { Post } from '@/types';

  /* MOCK-START */
  const post: Ref<Post> = ref({
    title: 'This is an example post',
    slug: 'example-post',
    createdAt: DateTime.now(),
    modifiedAt: DateTime.now(),
    summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    content: `
<h1>Lorem Ipsum</h1>
<h2>What is Lorem Ipsum?</h2>
<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
</div><div>
<h2>Why do we use it?</h2>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
</div><br /><div>
<h2>Where does it come from?</h2>
<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p><p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
</div><div>
<h2>Where can I get some?</h2>
<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
<form method="post" action="/feed/html"><table style="width:100%"><tr><td rowspan="2"><input type="text" name="amount" value="5" size="3" id="amount" /></td><td rowspan="2"><table style="text-align:left"><tr><td style="width:20px"><input type="radio" name="what" value="paras" id="paras" checked="checked" /></td><td><label for="paras">paragraphs</label></td></tr><tr><td style="width:20px"><input type="radio" name="what" value="words" id="words" /></td><td><label for="words">words</label></td></tr><tr><td style="width:20px"><input type="radio" name="what" value="bytes" id="bytes" /></td><td><label for="bytes">bytes</label></td></tr><tr><td style="width:20px"><input type="radio" name="what" value="lists" id="lists" /></td><td><label for="lists">lists</label></td></tr></table></td><td style="width:20px"><input type="checkbox" name="start" id="start" value="yes" checked="checked" /></td><td style="text-align:left"><label for="start">Start with 'Lorem<br />ipsum dolor sit amet...'</label></td></tr><tr><td></td><td style="text-align:left"><input type="submit" name="generate" id="generate" value="Generate Lorem Ipsum" /></td></tr></table></form></div><br /></div>
<hr /><div class="boxed"><strong>Donate:</strong> If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click <a target="_blank" href="/donate" class="lnk">here</a> to donate using PayPal. Thank you for your support. Donate bitcoin: 16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF</div>

<hr /><div class="boxed"><strong>Translations:</strong> Can you help translate this site into a foreign language ? Please email us with details if you can help.</div>

<hr /><div class="boxed">There is a set of mock banners available <a href="/banners" class="lnk">here</a> in three colours and in a range of standard banner sizes:<br /><a href="/banners"><img src="/images/banners/black_234x60.gif" width="234" height="60" alt="Banners" /></a><a href="/banners"><img src="/images/banners/grey_234x60.gif" width="234" height="60" alt="Banners" /></a><a href="/banners"><img src="/images/banners/white_234x60.gif" width="234" height="60" alt="Banners" /></a></div>

<hr /><div class="boxed" id="Packages">
<a target="_blank" rel="noopener" rel="nofollow" href="https://github.com/traviskaufman/node-lipsum">NodeJS</a>
<a target="_blank" rel="noopener" rel="nofollow" href="https://code.google.com/p/pypsum/">Python Interface</a>
<a target="_blank" rel="noopener" rel="nofollow" href="https://gtklipsum.sourceforge.net/">GTK Lipsum</a>
<a target="_blank" rel="noopener" rel="nofollow" href="https://github.com/gsavage/lorem_ipsum/tree/master">Rails</a>
<a target="_blank" rel="noopener" rel="nofollow" href="https://github.com/cerkit/LoremIpsum/">.NET</a>
</div>
    `,
    tags: ['fun-fact'],
    thumnailUrl: 'https://compote.slate.com/images/5294e6d0-53ed-4a4a-a350-7eaeab72ac93.jpeg?crop=1560%2C1040%2Cx0%2Cy0&width=840',
  });
  /* MOCK-END */

  /* TEMPLATE-START
  const post: Ref<Post> = ref({
    title: {{ title }},
    slug: {{ slug }},
    createdAt: new DateTime({{ createdAt }}),
    modifiedAt: new DateTime({{ modifiedAt }}),
    summary: {{ summary }},
    content: {{ content }},
    tags: {{ tags }},
    thumbnailUrl: {{ thumbnailUrl }},
  });
  */

  const createdAt = computed(() => {
    const now = DateTime.now();
    const daysDiff = Math.floor(now.diff(post.value.createdAt, 'days').toObject().days!);
    if (daysDiff == 0) {
      return 'Today';
    }
    if (daysDiff == 1) {
      return 'Yesterday';
    }
    if (daysDiff <= 7) {
      return `${daysDiff} days ago`;
    }
    return post.value.createdAt.toFormat('DDD');
  });

</script>
