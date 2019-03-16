module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'uni组件库'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', { src: '/assets/js/article.js'}],
    ['script', { src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js'}]
  ],
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'linjinze999/uni',
    docsRepo: 'linjinze999/uni',
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '帮我改进此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '指南',
            link: '/guide/',
          }
        ],
        sidebar: {
          '/guide/':[
            '',
            'start'
          ]
        }
      }
    }
  }
}
