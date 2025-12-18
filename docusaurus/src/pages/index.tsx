import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

const omgExample = `---
method: GET
path: /users/{userId}
operationId: get-user
tags: [Users]
---

# Get User

Returns a user by ID.

\`\`\`omg.path
{ userId: uuid }
\`\`\`

\`\`\`omg.response
{
  id: uuid,
  email: string @format("email"),
  name: string,
  role: "admin" | "user" | "guest",
  createdAt: datetime
}
\`\`\``;

const openApiExample = `openapi: 3.1.0
paths:
  /users/{userId}:
    get:
      operationId: get-user
      tags: [Users]
      summary: Get User
      description: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                required: [id, email, name, role, createdAt]
                properties:
                  id:
                    type: string
                    format: uuid
                  email:
                    type: string
                    format: email
                  name:
                    type: string
                  role:
                    type: string
                    enum: [admin, user, guest]
                  createdAt:
                    type: string
                    format: date-time`;

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <img src="/img/omg-light.svg" alt="OMG" className={styles.heroLogo} />
          <p className={styles.heroTagline}>A human-first DSL for API specification</p>
          <p className={styles.heroDescription}>
            Write API specs in Markdown. Compile to OpenAPI 3.1.
            <br />
            <strong>6x less code.</strong> Actually readable.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs">
              Get Started
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              href="https://github.com/mcclowes/omg"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CodeComparison() {
  return (
    <section className={styles.codeComparison}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          See the difference
        </Heading>
        <p className={styles.sectionSubtitle}>The same endpoint. One is human-readable.</p>
        <div className={styles.codeGrid}>
          <div className={styles.codePanel}>
            <div className={styles.codePanelHeader}>
              <span className={styles.codePanelLabel}>OMG</span>
              <span className={styles.codePanelMeta}>32 lines</span>
            </div>
            <CodeBlock language="markdown" className={styles.codeBlock}>
              {omgExample}
            </CodeBlock>
          </div>
          <div className={styles.codePanel}>
            <div className={styles.codePanelHeader}>
              <span className={styles.codePanelLabel}>OpenAPI YAML</span>
              <span className={styles.codePanelMeta}>52 illegible lines</span>
            </div>
            <CodeBlock language="yaml" className={styles.codeBlock}>
              {openApiExample}
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureItem = {
  icon: string;
  title: string;
  description: ReactNode;
};

const features: FeatureItem[] = [
  {
    icon: '📝',
    title: 'Markdown Native',
    description:
      'Write in familiar Markdown with YAML frontmatter. Technical writers and developers can collaborate without learning new syntax.',
  },
  {
    icon: '🔄',
    title: 'DRY with Partials',
    description:
      'Define errors, pagination, and auth once. Include them anywhere with {{> partials/errors }}. No more copy-pasting.',
  },
  {
    icon: '⚡',
    title: 'Full OpenAPI 3.1',
    description:
      'Compiles to standard OpenAPI. Use your existing tools for code generation, documentation, and testing.',
  },
  {
    icon: '🎯',
    title: 'Type-Safe Schemas',
    description:
      'Concise type syntax with constraints: string @minLength(1), integer @min(0), "a" | "b" enums, Type[] arrays.',
  },
  {
    icon: '🔍',
    title: 'IDE Support',
    description:
      'VS Code extension with syntax highlighting, autocomplete, and diagnostics. Catch errors as you type.',
  },
  {
    icon: '🛠️',
    title: 'CLI Tooling',
    description:
      'Build, lint, format, and parse commands. Integrate into your CI/CD pipeline with ease.',
  },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Why OMG?
        </Heading>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Heading as="h3" className={styles.featureTitle}>
                {feature.title}
              </Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Get started in seconds
        </Heading>
        <div className={styles.quickStartGrid}>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>1</div>
            <Heading as="h3" className={styles.stepTitle}>
              Install
            </Heading>
            <CodeBlock language="bash">npm install -g omg-md-cli</CodeBlock>
          </div>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>2</div>
            <Heading as="h3" className={styles.stepTitle}>
              Initialize
            </Heading>
            <CodeBlock language="bash">omg init my-api</CodeBlock>
          </div>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>3</div>
            <Heading as="h3" className={styles.stepTitle}>
              Build
            </Heading>
            <CodeBlock language="bash">omg build api.omg.md -o openapi.yaml</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <Heading as="h2" className={styles.ctaTitle}>
          Ready to simplify your API specs?
        </Heading>
        <p className={styles.ctaDescription}>
          Join developers who write API documentation they actually enjoy reading.
        </p>
        <div className={styles.ctaButtons}>
          <Link className="button button--primary button--lg" to="/docs">
            Read the Docs
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/mcclowes/omg"
          >
            Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Human-first API Specification"
      description="OMG is a Markdown-native language for describing APIs that compiles to OpenAPI 3.1"
    >
      <HomepageHeader />
      <main>
        <CodeComparison />
        <Features />
        <QuickStart />
        <CallToAction />
      </main>
    </Layout>
  );
}
