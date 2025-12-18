import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '6x Less Code',
    description: (
      <>
        A typical 30,000 line OpenAPI spec becomes ~5,000 lines in OMG.
        Write API specs in Markdown that humans can actually read.
      </>
    ),
  },
  {
    title: 'DRY by Design',
    description: (
      <>
        Define errors, pagination, and auth once with partials.
        Reuse them everywhere without copy-pasting YAML.
      </>
    ),
  },
  {
    title: 'Full OpenAPI 3.1',
    description: (
      <>
        Compiles to standard OpenAPI 3.1 specs. Use your existing tooling
        for code generation, documentation, and testing.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
