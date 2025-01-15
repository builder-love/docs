import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Builder Insights',
    Svg: require('@site/static/img/hooded-coder.svg').default,
    description: (
      <>
        builder.love was designed to help blockchain developers and researchers
        identify the technology being used to make the world a better place.
      </>
    ),
  },
  {
    title: 'Fight FUD',
    Svg: require('@site/static/img/pepe-ambivalent.svg').default,
    description: (
      <>
        Don&apos;t let CT FUD misguide you. Validate your past and current time
        investments, and decide where to invest your time in the future. Build
        important and meaningful technology.
      </>
    ),
  },
  {
    title: 'Grow your Legitimacy',
    Svg: require('@site/static/img/hooded-panda.svg').default,
    description: (
      <>
        Connect your onchain account, your research accounts, and social media
        accounts to grow your legitimacy. Coming soon...
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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