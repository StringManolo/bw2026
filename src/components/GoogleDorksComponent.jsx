import { useState } from 'react';

export const GoogleDorksComponent = ({ theme }) => {
  const [target, setTarget] = useState('');
  const [dorks, setDorks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dorkTemplates = [
// === Core / Baseline ===
{title:'Subdomains',desc:'Find subdomains of the target',query:'site:*.{TARGET} -www'},
{title:'Wayback Machine',desc:'Historical site content',query:'site:web.archive.org/*/{TARGET}/*'},
{title:'Public Documents',desc:'Exposed documents',query:'site:{TARGET} ext:doc OR ext:docx OR ext:pdf OR ext:xls OR ext:xlsx OR ext:ppt OR ext:pptx OR ext:csv'},
{title:'Code & Leaks (Git/Paste/Forums)',desc:'Source code and public leaks',query:'"{TARGET}" site:github.com OR site:gitlab.com OR site:pastebin.com OR site:justpaste.it OR site:dpaste.org OR site:stackoverflow.com'},
{title:'Cloud Storage',desc:'Exposed cloud storage buckets and URLs',query:'site:{TARGET} "s3.amazonaws.com" OR "storage.googleapis.com" OR "blob.core.windows.net" OR site:sharepoint.com OR site:onedrive.live.com'},
{title:'Backups & Archives',desc:'Backup and compressed files',query:'site:{TARGET} ext:bkf OR ext:bkp OR ext:bak OR ext:old OR ext:backup OR ext:zip OR ext:tar OR ext:gz OR ext:tgz OR ext:rar OR ext:7z'},
{title:'Directory Listings & VCS',desc:'Open directories and VCS leftovers',query:'site:{TARGET} intitle:"index of" OR inurl:"/.git/" OR inurl:"/.svn/" OR inurl:"/.hg/" OR inurl:"/.bzr/" OR inurl:".gitignore"'},
{title:'Configs & Env Files',desc:'Configuration and environment files exposed',query:'site:{TARGET} ext:conf OR ext:cnf OR ext:cfg OR ext:ini OR ext:env OR ext:xml OR ext:json'},
{title:'IaC & Cloud Secrets',desc:'Terraform/state files and cloud secret artifacts',query:'site:{TARGET} ext:tfstate OR ext:tfstate.backup OR intext:"terraform.tfstate" OR intext:"AKIA" OR intext:"aws_secret_access_key" OR intext:"client_secret" OR intext:"service_account"'},
{title:'Containers & Orchestration',desc:'Docker/Kubernetes config and manifests',query:'site:{TARGET} ext:dockerfile OR inurl:"docker-compose.yml" OR intext:"Kubernetes Dashboard" OR intext:"apiVersion" OR intext:"kubeconfig"'},
{title:'CI/CD Systems',desc:'Pipelines, dashboards, and build artifacts',query:'site:{TARGET} inurl:jenkins OR inurl:circleci OR inurl:travis-ci OR inurl:".gitlab-ci.yml" OR inurl:".github/workflows" OR inurl:"/artifacts/"'},
{title:'APIs & Dev Interfaces',desc:'API consoles, GraphQL, Swagger and dev UIs',query:'site:{TARGET} intitle:"Swagger UI" OR "openapi.json" OR inurl:"/graphql" OR inurl:"/graphiql" OR inurl:"/console" OR inurl:"/debug"'},
{title:'Auth Surfaces',desc:'Login pages, admin panels and auth endpoints',query:'site:{TARGET} inurl:login OR inurl:signin OR intitle:admin OR intitle:dashboard OR intitle:panel'},
{title:'Databases & Admin GUIs',desc:'Database dumps and web DB consoles',query:'site:{TARGET} ext:sql OR ext:db OR ext:dbf OR ext:mdb OR ext:sqlite OR ext:sqlite3 OR inurl:phpmyadmin OR inurl:adminer.php OR intext:"elasticsearch" OR intext:"CouchDB"'},
{title:'Logs & Debug',desc:'Logs, debug pages and staging/dev artifacts',query:'site:{TARGET} ext:log OR "DEBUG" OR "debug=true" OR "staging" OR "development"'},
{title:'Error Disclosure',desc:'Server/PHP/SQL error messages exposing internals',query:'site:{TARGET} "PHP Warning" OR "PHP Error" OR "sql syntax near" OR "mysql_query()"'},
{title:'Injection Surfaces',desc:'URLs and params commonly vulnerable to injection',query:'site:{TARGET} inurl:"id=" OR inurl:"file=" OR inurl:"page=" OR inurl:"q=" OR inurl:"search=" OR inurl:"redirect="'},
{title:'Secrets & Credentials',desc:'Passwords, tokens and private keys in plaintext',query:'site:{TARGET} "password" OR "passwd" OR "Bearer " OR "jwt" OR "BEGIN RSA PRIVATE KEY"'},
{title:'Identity & Messaging',desc:'Emails, mail configs and SAML/metadata files',query:'site:{TARGET} intext:"@{TARGET}" OR intext:"smtp_user" OR inurl:"/saml" OR inurl:"/metadata"'},
{title:'CMS & Monitoring',desc:'CMS artifacts and monitoring dashboards',query:'site:{TARGET} inurl:"wp-content" OR "wp-config.php" OR inurl:"/metrics" OR inurl:"/health" OR "grafana" OR "prometheus"'},

// === Extra / Advanced ===
{title:'Robots & Sitemap',desc:'robots.txt and sitemap.xml exposing endpoints',query:'site:{TARGET} inurl:robots.txt OR inurl:sitemap.xml'},
{title:'Package Manifests',desc:'Dependency manifests revealing libraries/versioning',query:'site:{TARGET} intext:"package.json" OR intext:"pom.xml" OR intext:"requirements.txt" OR intext:"Gemfile"'},
{title:'Registry Auth Files',desc:'npm/pip registry auth files and tokens',query:'site:{TARGET} inurl:".npmrc" OR inurl:".pypirc" OR intext:"*authToken"'},
{title:'Credentials in URLs',desc:'Auth tokens and creds passed in query strings',query:'site:{TARGET} inurl:"token=" OR inurl:"auth=" OR inurl:"access_token="'},
{title:'Generic API Keys',desc:'Common provider API key patterns (Google, GH, Stripe)',query:'site:{TARGET} intext:"AIza" OR intext:"ghp*" OR intext:"sk_live_" OR intext:"xoxb-"'},
{title:'Stripe Keys',desc:'Stripe publishable/secret keys in code or logs',query:'site:{TARGET} intext:"sk_live_" OR intext:"pk_live_" OR intext:"sk_test_"'},
{title:'Slack Tokens',desc:'Slack bot/user tokens and creds',query:'site:{TARGET} intext:"xoxb-" OR intext:"xoxp-"'},
{title:'Twilio Keys',desc:'Twilio account SIDs and auth tokens',query:'site:{TARGET} intext:"TWILIO_ACCOUNT_SID" OR intext:"TWILIO_AUTH_TOKEN"'},
{title:'PGP Private Keys',desc:'PGP private key blocks and key material',query:'site:{TARGET} "BEGIN PGP PRIVATE KEY BLOCK"'},
{title:'SSH Artifacts',desc:'SSH keys, authorized_keys and SSH configs',query:'site:{TARGET} intext:"ssh-rsa" OR intext:"authorized_keys"'},
{title:'IDE Artifacts',desc:'IDE/project metadata leaking paths or secrets',query:'site:{TARGET} intext:".vscode" OR intext:".idea" OR ext:iml'},
{title:'Installers & Binaries',desc:'Packaged installers and distributables',query:'site:{TARGET} ext:deb OR ext:rpm OR ext:apk OR ext:msi OR ext:exe'},
{title:'Build Artifacts',desc:'Compiled artifacts and distribution folders',query:'site:{TARGET} ext:jar OR ext:war OR intext:"/dist/" OR intext:"/build/"'},
{title:'README & Docs',desc:'Project READMEs, docs and changelogs',query:'site:{TARGET} intext:"README" OR intext:"CHANGELOG"'},
{title:'Composer Files',desc:'PHP composer manifests and lock files',query:'site:{TARGET} intext:"composer.json" OR intext:"composer.lock"'},
{title:'AWS Temp Tokens',desc:'STS/temporary token artifacts (ASIA/Session tokens)',query:'site:{TARGET} intext:"ASIA" OR intext:"aws_session_token"'},
{title:'WebDAV / Nextcloud',desc:'WebDAV endpoints and Nextcloud remote.php leaks',query:'site:{TARGET} inurl:"/webdav" OR inurl:"/remote.php/webdav"'},
{title:'Project Management Tools',desc:'Jira/Confluence pages and leaks',query:'site:{TARGET} intext:"atlassian.net" OR intext:"confluence"'},
{title:'JWKS / OIDC',desc:'JWKS and OIDC endpoints exposing signing keys',query:'site:{TARGET} inurl:"/.well-known/jwks.json" OR inurl:"openid-configuration"'},

// === Elite / 0.01% ===
{title:'Source Maps',desc:'JavaScript source maps revealing original source paths',query:'site:{TARGET} ext:map intext:"sources"'},
{title:'Frontend Secrets',desc:'Secrets and keys embedded in JS bundles',query:'site:{TARGET} ext:js intext:"apiKey" OR intext:"clientSecret"'},
{title:'Feature Flags',desc:'Feature flag service configs and keys',query:'site:{TARGET} intext:"launchdarkly" OR intext:"unleash"'},
{title:'Internal APIs',desc:'Private/internal endpoints and paths',query:'site:{TARGET} inurl:"/internal/" OR inurl:"/private/"'},
{title:'Legacy APIs',desc:'Deprecated API versions and legacy routes',query:'site:{TARGET} inurl:"/v0/" OR inurl:"/legacy"'},
{title:'SOAP/WSDL',desc:'SOAP service descriptors and WSDL endpoints',query:'site:{TARGET} ext:wsdl OR inurl:"?wsdl"'},
{title:'GraphQL Introspection',desc:'GraphQL schema leaks and __schema exposure',query:'site:{TARGET} intext:"__schema" OR intext:"__typename"'},
{title:'Firebase / Supabase',desc:'Serverless backend URLs and exposed configs',query:'site:{TARGET} intext:"firebaseio.com" OR intext:"supabase.co"'},
{title:'Artifact Registries',desc:'Artifactory/Nexus repos and artifacts',query:'site:{TARGET} intext:"artifactory" OR intext:"nexus"'},
{title:'Kube Secrets',desc:'Kubernetes Secret manifests and values.yaml leaks',query:'site:{TARGET} ext:yaml intext:"kind: Secret"'},
{title:'Helm Charts',desc:'Helm chart values and defaults exposing secrets',query:'site:{TARGET} intext:"values.yaml"'},
{title:'Message Brokers',desc:'Kafka, RabbitMQ endpoints and creds',query:'site:{TARGET} intext:"Kafka" OR intext:"RabbitMQ"'},
{title:'Search Consoles',desc:'Kibana/Splunk consoles and dashboards',query:'site:{TARGET} intext:"Kibana" OR intext:"Splunk"'},
{title:'Error Trackers',desc:'Sentry, NewRelic DSNs and error tracker configs',query:'site:{TARGET} intext:"sentry_dsn" OR intext:"newrelic"'},
{title:'Desktop Updaters',desc:'Electron update feeds and RELEASE files',query:'site:{TARGET} intext:"latest.yml" OR intext:"RELEASES"'},
{title:'Firmware Images',desc:'Embedded firmware images and binary blobs',query:'site:{TARGET} ext:bin OR ext:img OR ext:firmware'},
{title:'Shadow IT SaaS',desc:'Notion/Airtable/Miro instances used by org',query:'site:{TARGET} intext:"notion.so" OR intext:"airtable" OR intext:"miro.com"'},
{title:'Webhook Endpoints',desc:'Third-party webhook URLs (Zapier/IFTTT) leaking hooks',query:'site:{TARGET} intext:"hooks.zapier.com" OR intext:"maker.ifttt.com"'},
{title:'CDN Origins',desc:'CDN origin hostnames and origin headers',query:'site:{TARGET} intext:"cloudfront.net" intext:"origin"'},
{title:'VPN / MDM',desc:'VPN portals and MDM/Intune consoles',query:'site:{TARGET} intext:"AnyConnect" OR intext:"Intune"'},
{title:'Secrets Backups',desc:'Vault snapshots and backup dumps containing secrets',query:'site:{TARGET} intext:"vault snapshot"'},
{title:'Time-Series DBs',desc:'InfluxDB/Chronograf endpoints and data',query:'site:{TARGET} intext:"InfluxDB" OR intext:"Chronograf"'},
{title:'Internal Docs',desc:'Design docs, ADRs and internal architecture notes',query:'site:{TARGET} intext:"Architecture Decision Record" OR intext:"ADR-"' },

// === Tech Stack Specifics ===
{title:'Spring Boot Actuators',desc:'Exposed Spring Boot actuator endpoints and diagnostics',query:'site:{TARGET} inurl:/actuator/ OR inurl:/actuator/env OR inurl:/actuator/heapdump OR inurl:/jolokia'},
{title:'Laravel Debug',desc:'Laravel debug pages and Whoops error output',query:'site:{TARGET} intext:"Laravel" intext:"Whoops! There was an error."'},
{title:'Django Debug',desc:'Django debug pages and DEBUG=True exposures',query:'site:{TARGET} intext:"DisallowedHost" OR intext:"DEBUG = True"'},
{title:'Rails Info',desc:'Rails info pages and mailer/route disclosures',query:'site:{TARGET} inurl:"/rails/info/routes" OR inurl:"/rails/mailers"'},
{title:'PHP Info',desc:'Exposed phpinfo() pages revealing PHP config',query:'site:{TARGET} ext:php intitle:"phpinfo()" "PHP Version"'},

// === SaaS & External Leaks ===
{title:'Public Trello Boards',desc:'Public Trello boards mentioning the target',query:'site:trello.com "{TARGET}"'},
{title:'Postman Collections',desc:'Leaked Postman API collections and credentials',query:'site:postman.com "{TARGET}" OR site:documenter.getpostman.com "{TARGET}"'},
{title:'Code Sandboxes',desc:'Snippets in JSFiddle/CodePen/CodeSandbox referencing target',query:'site:jsfiddle.net "{TARGET}" OR site:codepen.io "{TARGET}" OR site:repl.it "{TARGET}" OR site:codesandbox.io "{TARGET}"'},
{title:'Pastebin Alternatives',desc:'Pastes and archived paste content mentioning target',query:'site:paste.org "{TARGET}" OR site:ghostbin.com "{TARGET}" OR site:archive.org "pastebin.com" "{TARGET}"'},
{title:'Google Groups',desc:'Mailing list posts and group discussions',query:'site:groups.google.com "{TARGET}"'},
{title:'S3/Cloud Takeover',desc:'Bucket takeover indicators and missing buckets',query:'site:{TARGET} "The specified bucket does not exist" OR "NoSuchBucket" OR "BlobNotFound"'},

// === Vuln Patterns ===
{title:'Open Redirects',desc:'Common redirect parameters prone to open redirect',query:'site:{TARGET} inurl:url= OR inurl:return= OR inurl:next= OR inurl:redir= OR inurl:dest= OR inurl:target='},
{title:'XSS Sinks',desc:'Parameters often vulnerable to reflected/stored XSS',query:'site:{TARGET} inurl:q= OR inurl:s= OR inurl:search= OR inurl:query= OR inurl:keyword= OR inurl:lang='},
{title:'IDOR / Enumeration',desc:'Numeric IDs and predictable identifiers for enumeration',query:'site:{TARGET} inurl:id= OR inurl:user= OR inurl:profile= OR inurl:order='},
{title:'File Uploads',desc:'Upload endpoints and file-import interfaces',query:'site:{TARGET} inurl:upload OR inurl:import OR intext:"choose file"'},

// === Mobile & Assets ===
{title:'Mobile Apps',desc:'App Store / Play Store listings and bundle metadata',query:'site:play.google.com "{TARGET}" OR site:apps.apple.com "{TARGET}"'},
{title:'Assets & Fonts',desc:'Font files and static assets that may leak info',query:'site:{TARGET} ext:ttf OR ext:otf OR ext:woff OR ext:woff2 OR ext:eot'},

// === Cloud & Serverless ===
{title:'Lambda/Function URLs',desc:'Serverless function invoke URLs (AWS Lambda/execute-api)',query:'site:{TARGET} "amazonaws.com" "lambda" OR "execute-api"'},
{title:'Cloudflare Workers',desc:'Cloudflare Workers endpoints and worker.dev hosts',query:'site:{TARGET} intext:"workers.dev" OR intext:"cloudflare-worker"'},
{title:'Vercel/Netlify',desc:'Vercel/Netlify deploys, previews and site domains',query:'site:{TARGET} intext:"vercel.app" OR intext:"netlify.app" OR intext:"onrender.com"'},
{title:'Firebase Configs',desc:'Client-side firebase config objects exposing keys',query:'site:{TARGET} intext:"firebaseConfig" OR intext:"apiKey.*firebase"'},
{title:'Azure Functions',desc:'Azure Functions apps and function endpoints',query:'site:{TARGET} intext:"azurewebsites.net" OR intext:"functionapp"'},
{title:'GCP Cloud Run/Functions',desc:'Google Cloud Run/Functions endpoints and URLs',query:'site:{TARGET} intext:"run.app" OR intext:"cloudfunctions.net"'},
{title:'Supabase Configs',desc:'Supabase project URLs and public keys',query:'site:{TARGET} intext:"supabaseUrl" OR intext:"supabaseKey"'},
{title:'Vercel Envs',desc:'Exposed Vercel/Next/Vite public env variables (NEXT_PUBLIC_/VITE_)',query:'site:{TARGET} intext:"NEXT_PUBLIC_" OR intext:"VITE_"'},

// === Modern Secrets ===
{title:'GitHub Fine-grained Tokens',desc:'GitHub fine-grained PATs and token patterns',query:'site:{TARGET} intext:"github_pat_"'},
{title:'GitLab Pipeline Vars',desc:'GitLab CI tokens and pipeline variables',query:'site:{TARGET} intext:"CI_JOB_TOKEN" OR intext:"CI_ACCESS_TOKEN"'},
{title:'Datadog Keys',desc:'Datadog API/ingest keys found in files',query:'site:{TARGET} intext:"datadoghq.com" intext:"DD-API-KEY"'},
{title:'New Relic License Keys',desc:'New Relic license/agent keys in repos',query:'site:{TARGET} intext:"NEW_RELIC_LICENSE_KEY"'},
{title:'OpenAI API Keys',desc:'OpenAI secret keys and SDK leaks (sk-...)',query:'site:{TARGET} intext:"sk-" intext:"openai"'},
{title:'Anthropic Keys',desc:'Anthropic API keys and related tokens',query:'site:{TARGET} intext:"sk-ant-"'},
{title:'HuggingFace Tokens',desc:'HuggingFace API tokens and creds (hf_)',query:'site:{TARGET} intext:"hf_"'},
{title:'Docker Hub Tokens',desc:'Docker Hub PATs and registry tokens',query:'site:{TARGET} intext:"dckr_pat_"'},
{title:'HashiCorp Vault Tokens',desc:'Vault tokens, snapshots or token markers',query:'site:{TARGET} intext:"hvs." OR intext:"vault token"'},
{title:'CircleCI Contexts',desc:'CircleCI tokens and context variable leaks',query:'site:{TARGET} intext:"CIRCLECI_TOKEN" OR intext:"CIRCLE_TOKEN"'},
{title:'Terraform Cloud Tokens',desc:'Terraform Cloud/TFC token references and app.terraform.io',query:'site:{TARGET} intext:"TFC_TOKEN" OR intext:"app.terraform.io"'},
{title:'Buildkite Tokens',desc:'Buildkite pipeline and API tokens',query:'site:{TARGET} intext:"BUILDKITE_TOKEN"'},

// === Mobile & APIs ===
{title:'APK Decompiled',desc:'Public APK/IPA files and downloadable app packages',query:'site:{TARGET} ext:apk OR ext:ipa'},
{title:'iOS/Android Manifests',desc:'Mobile manifest files (Info.plist/AndroidManifest.xml)',query:'site:{TARGET} intext:"Info.plist" OR intext:"AndroidManifest.xml"'},
{title:'In-App Purchase Keys',desc:'IAP/purchase keys or purchase_key artifacts',query:'site:{TARGET} intext:"IAP" OR intext:"purchase_key"'},
{title:'Google Services JSON',desc:'google-services.json files containing Firebase creds',query:'site:{TARGET} intext:"google-services.json"'},
{title:'Apple P8 Keys',desc:'Apple .p8/PRIVATE KEY files used for APNs/Auth',query:'site:{TARGET} intext:"BEGIN PRIVATE KEY" intext:"AUTHKEY"'},

// === IAC & DevOps ===
{title:'Pulumi Stacks',desc:'Pulumi stack files and JSON state containing config',query:'site:{TARGET} intext:"pulumi" ext:json'},
{title:'Ansible Vaults',desc:'Ansible Vault-encrypted files and vault markers',query:'site:{TARGET} ext:yml intext:"$ANSIBLE_VAULT"'},
{title:'Chef Secrets',desc:'Chef encrypted data bags and secret references',query:'site:{TARGET} intext:"encrypted_data_bag"'},
{title:'GitOps Repos',desc:'Flux/Argo CD repos, manifests and K8s resources',query:'site:{TARGET} intext:"fluxcd" OR intext:"argocd"'},
{title:'Helm Repos',desc:'Helm charts, values and repo manifests',query:'site:{TARGET} intext:"helm repo" ext:yaml'},
{title:'SOPS Files',desc:'SOPS-encrypted files and key markers',query:'site:{TARGET} intext:"sops" ext:yaml OR ext:json'},
{title:'Terraform Variables',desc:'Terraform .tfvars files and variable leaks',query:'site:{TARGET} ext:tfvars OR ext:auto.tfvars'},

// === P1/P2 ===
{title:'CORS Misconfigs',desc:'Permissive CORS headers and risky combos',query:'site:{TARGET} intext:"Access-Control-Allow-Origin: *" intext:"Access-Control-Allow-Credentials: true"'},
{title:'SQL Errors Deep',desc:'Database error messages and SQL stack traces',query:'site:{TARGET} intext:"SQLSTATE" OR intext:"PDOException" OR intext:"ORA-" OR intext:"PL/SQL"'},
{title:'SSRF Indicators',desc:'Endpoints taking external URLs indicating SSRF risk',query:'site:{TARGET} inurl:url= OR inurl:dest= OR inurl:redirect='},
{title:'JWT Tokens in URLs',desc:'JWTs and access tokens passed in query strings',query:'site:{TARGET} inurl:"access_token=" OR inurl:"id_token="'},
{title:'GraphQL Batching',desc:'GraphQL batching and persisted query indicators',query:'site:{TARGET} intext:"extensions" intext:"persistedQuery"'},
{title:'Cache Poisoning',desc:'Cache/proxy headers and X-Forwarded-Host indicators',query:'site:{TARGET} intext:"X-Cache" OR intext:"X-Forwarded-Host"'},

// === Alternative Leaks ===
{title:'Telegram Leaks',desc:'Telegram channels/messages referencing the target',query:'site:t.me "{TARGET}"'},
{title:'Discord Attachments',desc:'Discord CDN attachments and uploaded files',query:'site:cdn.discordapp.com "{TARGET}"'},
{title:'Gists Modern',desc:'GitHub Gists referencing target or creds',query:'site:gist.github.com "{TARGET}"'},
{title:'Bitbucket Snippets',desc:'Bitbucket snippets containing code or secrets',query:'site:bitbucket.org/snippets "{TARGET}"'},
{title:'Codeberg',desc:'Codeberg repositories and snippets mentioning target',query:'site:codeberg.org "{TARGET}"'},
{title:'Sourcehut',desc:'sourcehut (sr.ht) hosted code and snippets',query:'site:sr.ht "{TARGET}"'},
{title:'GitLab Snippets',desc:'GitLab snippet pages with possible secret leaks',query:'site:gitlab.com/snippets "{TARGET}"'},
{title:'Private Package Registries',desc:'References to private package registries and scoped packages',query:'site:{TARGET} intext:"npm.pkg.github.com" OR intext:"pkg.coding.net"'},

// === High Impact ===
{title:'Chrome Extensions',desc:'Chrome Web Store extension pages and manifests',query:'site:chrome.google.com/webstore/detail "{TARGET}"'},
{title:'Windows Registry',desc:'Exported .reg files and registry content mentioning target',query:'site:{TARGET} intext:"Windows Registry Editor" ext:reg'},
{title:'Systemd Services',desc:'systemd unit/service files revealing service configs',query:'site:{TARGET} intext:"[Unit]" intext:"[Service]"'},
{title:'NPM Package Info',desc:'NPM registry package pages and metadata',query:'site:registry.npmjs.org/{TARGET}'},
{title:'PyPI Packages',desc:'PyPI project pages and release info',query:'site:pypi.org/project/{TARGET}'},
{title:'Maven Repositories',desc:'Maven artifact pages and group/artifact info',query:'site:mvnrepository.com/artifact/{TARGET}'},
{title:'Docker Images',desc:'Docker Hub repos and image metadata for target',query:'site:hub.docker.com/r/{TARGET}'},
{title:'Swagger Aggregators',desc:'Aggregated Swagger/OpenAPI bundles exposing endpoints',query:'site:{TARGET} intext:"swagger-ui-bundle.js"'},
{title:'WSO2 Exposures',desc:'WSO2 management consoles and carbon endpoints',query:'site:{TARGET} intext:"WSO2" OR inurl:"/carbon"'},
{title:'SAP Configs',desc:'SAP system/config files and references',query:'site:{TARGET} intext:"sap-system" OR intext:"sap-config"'},
];


  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const generateDorks = () => {
    if (!target.trim()) {
      showToastMessage('Please enter a target domain');
      return;
    }

    const generated = dorkTemplates.map(template => ({
      ...template,
      url: 'https://www.google.com/search?q=' + encodeURIComponent(
        template.query.replace(/{TARGET}/g, target.trim())
      )
    }));

    setDorks(generated);
    showToastMessage(`✓ Generated ${generated.length} dorks for ${target.trim()}`);
  };

  const openAllDorks = () => {
    if (dorks.length === 0) return;

    dorks.forEach((dork, index) => {
      setTimeout(() => {
        window.open(dork.url, '_blank', 'noopener,noreferrer');
      }, index * 100);
    });

    showToastMessage(`Opening ${dorks.length} dorks...`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateDorks();
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'inherit'
    }}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          padding: '1em 1.5em',
          background: theme.text,
          color: theme.bg,
          borderRadius: '4px',
          fontSize: '0.95em',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'slideIn 0.3s ease-out',
          zIndex: 1000
        }}>
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Input Section - copied from AISearchBar */}
      <div style={{
        marginBottom: '3em',
        padding: '2em',
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        background: theme.bg
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5em',
          marginBottom: '0',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="example.com"
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '0.75em 1em',
              fontSize: '1em',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              background: theme.bg,
              color: theme.text,
              fontFamily: 'monospace',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = theme.text}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />
          <button
            onClick={generateDorks}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: target.trim() ? 'pointer' : 'not-allowed',
              opacity: target.trim() ? 1 : 0.5,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Generate
          </button>
          <button
            onClick={openAllDorks}
            disabled={dorks.length === 0}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: dorks.length === 0 ? 'not-allowed' : 'pointer',
              opacity: dorks.length === 0 ? 0.5 : 1,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Open All
          </button>
        </div>
      </div>

      {/* Target Info */}
      {dorks.length > 0 && (
        <div style={{
          background: theme.isDark ? '#001a1a' : '#e8f4f8',
          border: `1px solid ${theme.isDark ? '#003333' : '#b8dce8'}`,
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '0.95em',
          color: theme.isDark ? '#66cccc' : '#2c5f7a'
        }}>
          Target: <strong>{target}</strong> | {dorks.length} dorks generated
        </div>
      )}

      {/* Dorks List */}
      <div>
        {dorks.map((dork, index) => (
          <div
            key={index}
            style={{
              background: theme.bg,
              border: `1px solid ${theme.border}`,
              borderRadius: '3px',
              padding: '20px',
              marginBottom: '15px',
              transition: 'border-color 0.2s'
            }}
          >
            <div style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '8px'
            }}>
              {dork.title}
            </div>
            <div style={{
              color: theme.textSecondary,
              fontSize: '0.9em',
              marginBottom: '12px',
              lineHeight: '1.6'
            }}>
              {dork.desc}
            </div>
            <a
              href={dork.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                color: theme.text,
                textDecoration: 'none',
                padding: '8px 16px',
                border: `1px solid ${theme.text}`,
                borderBottom: `1px solid ${theme.text}`,
                borderRadius: '3px',
                fontSize: '0.9em',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = theme.text;
                e.target.style.color = theme.bg;
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = theme.text;
              }}
            >
              Search →
            </a>
          </div>
        ))}
      </div>

      {/* Usage info */}
      {dorks.length === 0 && (
        <div style={{
          color: theme.textSecondary,
          fontSize: '0.95em',
          lineHeight: '1.8',
          marginTop: '30px'
        }}>
          <h3 style={{ marginBottom: '15px', color: theme.text }}>Usage</h3>
          <ol style={{ paddingLeft: '2em' }}>
            <li>Enter your target domain in the input field</li>
            <li>Click "Generate" to create all dork queries</li>
            <li>Click "Open All" to launch all searches at once</li>
            <li>Or click individual "Search" links to open specific dorks</li>
          </ol>
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: theme.isDark ? '#332200' : '#fff3cd',
            border: `1px solid ${theme.isDark ? '#664400' : '#ffc107'}`,
            borderRadius: '3px',
            color: theme.isDark ? '#ffcc66' : '#856404'
          }}>
            <strong>Disclaimer:</strong> This tool is for educational and authorized security testing only.
            Always obtain proper authorization before performing reconnaissance on any target.
          </div>
        </div>
      )}
    </div>
  );
};
