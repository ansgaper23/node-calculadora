import React from 'react';

const Section = ({ id, title, children }) => (
  <section id={id} className="py-12 border-t first:border-t-0">
    <h2 className="text-3xl font-bold mb-8 text-brand-blue">{title}</h2>
    {children}
  </section>
);

export default Section;