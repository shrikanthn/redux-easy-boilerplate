import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

const metaData = {
  title: 'Redux Easy Boilerplate',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class Home extends Component {
  render() {
    return (
      <section>
        <Header />
        <section>
          <DocumentMeta {...metaData} />
        </section>
        <Footer />
      </section>
    );
  }
}
