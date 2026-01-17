import { useState } from 'react';

export const GoogleDorksComponent = ({ theme }) => {
  const [target, setTarget] = useState('');
  const [dorks, setDorks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const dorkTemplates = [
// === Core / Baseline ===
{title:'Subdomains',desc:'Find subdomains of the target',query:'site:*.{TARGET} -www',category:'reconnaissance'},
{title:'Subdomains CRT',desc:'Find subdomains of the target from certificates',query:'https://crt.sh/?q={TARGET}',category:'reconnaissance'},
{title:'Wayback Machine',desc:'Historical site content',query:'https://web.archive.org/web/20260000000000*/{TARGET}',category:'reconnaissance'},
{title:'Public Documents',desc:'Exposed documents',query:'site:{TARGET} ext:doc OR ext:docx OR ext:pdf OR ext:xls OR ext:xlsx OR ext:ppt OR ext:pptx OR ext:csv',category:'documents'},
{title:'Code & Leaks (Git/Paste/Forums)',desc:'Source code and public leaks',query:'"{TARGET}" site:github.com OR site:gitlab.com OR site:pastebin.com OR site:justpaste.it OR site:dpaste.org OR site:stackoverflow.com',category:'code'},
{title:'Cloud Storage',desc:'Exposed cloud storage buckets and URLs',query:'site:{TARGET} "s3.amazonaws.com" OR "storage.googleapis.com" OR "blob.core.windows.net" OR site:sharepoint.com OR site:onedrive.live.com',category:'cloud'},
{title:'Backups & Archives',desc:'Backup and compressed files',query:'site:{TARGET} ext:bkf OR ext:bkp OR ext:bak OR ext:old OR ext:backup OR ext:zip OR ext:tar OR ext:gz OR ext:tgz OR ext:rar OR ext:7z',category:'backups'},
{title:'Directory Listings & VCS',desc:'Open directories and VCS leftovers',query:'site:{TARGET} intitle:"index of" OR inurl:"/.git/" OR inurl:"/.svn/" OR inurl:"/.hg/" OR inurl:"/.bzr/" OR inurl:".gitignore"',category:'misconfig'},
{title:'Configs & Env Files',desc:'Configuration and environment files exposed',query:'site:{TARGET} ext:conf OR ext:cnf OR ext:cfg OR ext:ini OR ext:env OR ext:xml OR ext:json',category:'config'},
{title:'IaC & Cloud Secrets',desc:'Terraform/state files and cloud secret artifacts',query:'site:{TARGET} ext:tfstate OR ext:tfstate.backup OR intext:"terraform.tfstate" OR intext:"AKIA" OR intext:"aws_secret_access_key" OR intext:"client_secret" OR intext:"service_account"',category:'secrets'},
{title:'Containers & Orchestration',desc:'Docker/Kubernetes config and manifests',query:'site:{TARGET} ext:dockerfile OR inurl:"docker-compose.yml" OR intext:"Kubernetes Dashboard" OR intext:"apiVersion" OR intext:"kubeconfig"',category:'devops'},
{title:'CI/CD Systems',desc:'Pipelines, dashboards, and build artifacts',query:'site:{TARGET} inurl:jenkins OR inurl:circleci OR inurl:travis-ci OR inurl:".gitlab-ci.yml" OR inurl:".github/workflows" OR inurl:"/artifacts/"',category:'devops'},
{title:'APIs & Dev Interfaces',desc:'API consoles, GraphQL, Swagger and dev UIs',query:'site:{TARGET} intitle:"Swagger UI" OR "openapi.json" OR inurl:"/graphql" OR inurl:"/graphiql" OR inurl:"/console" OR inurl:"/debug"',category:'api'},
{title:'Auth Surfaces',desc:'Login pages, admin panels and auth endpoints',query:'site:{TARGET} inurl:login OR inurl:signin OR intitle:admin OR intitle:dashboard OR intitle:panel',category:'auth'},
{title:'Databases & Admin GUIs',desc:'Database dumps and web DB consoles',query:'site:{TARGET} ext:sql OR ext:db OR ext:dbf OR ext:mdb OR ext:sqlite OR ext:sqlite3 OR inurl:phpmyadmin OR inurl:adminer.php OR intext:"elasticsearch" OR intext:"CouchDB"',category:'database'},
{title:'Logs & Debug',desc:'Logs, debug pages and staging/dev artifacts',query:'site:{TARGET} ext:log OR "DEBUG" OR "debug=true" OR "staging" OR "development"',category:'logs'},
{title:'Error Disclosure',desc:'Server/PHP/SQL error messages exposing internals',query:'site:{TARGET} "PHP Warning" OR "PHP Error" OR "sql syntax near" OR "mysql_query()"',category:'vulns'},
{title:'Injection Surfaces',desc:'URLs and params commonly vulnerable to injection',query:'site:{TARGET} inurl:"id=" OR inurl:"file=" OR inurl:"page=" OR inurl:"q=" OR inurl:"search=" OR inurl:"redirect="',category:'vulns'},
{title:'Secrets & Credentials',desc:'Passwords, tokens and private keys in plaintext',query:'site:{TARGET} "password" OR "passwd" OR "Bearer " OR "jwt" OR "BEGIN RSA PRIVATE KEY"',category:'secrets'},
{title:'Identity & Messaging',desc:'Emails, mail configs and SAML/metadata files',query:'site:{TARGET} intext:"@{TARGET}" OR intext:"smtp_user" OR inurl:"/saml" OR inurl:"/metadata"',category:'auth'},
{title:'CMS & Monitoring',desc:'CMS artifacts and monitoring dashboards',query:'site:{TARGET} inurl:"wp-content" OR "wp-config.php" OR inurl:"/metrics" OR inurl:"/health" OR "grafana" OR "prometheus"',category:'monitoring'},

// === Extra / Advanced ===
{title:'Robots & Sitemap',desc:'robots.txt and sitemap.xml exposing endpoints',query:'site:{TARGET} inurl:robots.txt OR inurl:sitemap.xml',category:'reconnaissance'},
{title:'Package Manifests',desc:'Dependency manifests revealing libraries/versioning',query:'site:{TARGET} intext:"package.json" OR intext:"pom.xml" OR intext:"requirements.txt" OR intext:"Gemfile"',category:'code'},
{title:'Registry Auth Files',desc:'npm/pip registry auth files and tokens',query:'site:{TARGET} inurl:".npmrc" OR inurl:".pypirc" OR intext:"*authToken"',category:'secrets'},
{title:'Credentials in URLs',desc:'Auth tokens and creds passed in query strings',query:'site:{TARGET} inurl:"token=" OR inurl:"auth=" OR inurl:"access_token="',category:'secrets'},
{title:'Generic API Keys',desc:'Common provider API key patterns (Google, GH, Stripe)',query:'site:{TARGET} intext:"AIza" OR intext:"ghp*" OR intext:"sk_live_" OR intext:"xoxb-"',category:'secrets'},
{title:'Stripe Keys',desc:'Stripe publishable/secret keys in code or logs',query:'site:{TARGET} intext:"sk_live_" OR intext:"pk_live_" OR intext:"sk_test_"',category:'secrets'},
{title:'Slack Tokens',desc:'Slack bot/user tokens and creds',query:'site:{TARGET} intext:"xoxb-" OR intext:"xoxp-"',category:'secrets'},
{title:'Twilio Keys',desc:'Twilio account SIDs and auth tokens',query:'site:{TARGET} intext:"TWILIO_ACCOUNT_SID" OR intext:"TWILIO_AUTH_TOKEN"',category:'secrets'},
{title:'PGP Private Keys',desc:'PGP private key blocks and key material',query:'site:{TARGET} "BEGIN PGP PRIVATE KEY BLOCK"',category:'secrets'},
{title:'SSH Artifacts',desc:'SSH keys, authorized_keys and SSH configs',query:'site:{TARGET} intext:"ssh-rsa" OR intext:"authorized_keys"',category:'secrets'},
{title:'IDE Artifacts',desc:'IDE/project metadata leaking paths or secrets',query:'site:{TARGET} intext:".vscode" OR intext:".idea" OR ext:iml',category:'misconfig'},
{title:'Installers & Binaries',desc:'Packaged installers and distributables',query:'site:{TARGET} ext:deb OR ext:rpm OR ext:apk OR ext:msi OR ext:exe',category:'files'},
{title:'Build Artifacts',desc:'Compiled artifacts and distribution folders',query:'site:{TARGET} ext:jar OR ext:war OR intext:"/dist/" OR intext:"/build/"',category:'code'},
{title:'README & Docs',desc:'Project READMEs, docs and changelogs',query:'site:{TARGET} intext:"README" OR intext:"CHANGELOG"',category:'documents'},
{title:'Composer Files',desc:'PHP composer manifests and lock files',query:'site:{TARGET} intext:"composer.json" OR intext:"composer.lock"',category:'code'},
{title:'AWS Temp Tokens',desc:'STS/temporary token artifacts (ASIA/Session tokens)',query:'site:{TARGET} intext:"ASIA" OR intext:"aws_session_token"',category:'secrets'},
{title:'WebDAV / Nextcloud',desc:'WebDAV endpoints and Nextcloud remote.php leaks',query:'site:{TARGET} inurl:"/webdav" OR inurl:"/remote.php/webdav"',category:'misconfig'},
{title:'Project Management Tools',desc:'Jira/Confluence pages and leaks',query:'site:{TARGET} intext:"atlassian.net" OR intext:"confluence"',category:'saas'},
{title:'JWKS / OIDC',desc:'JWKS and OIDC endpoints exposing signing keys',query:'site:{TARGET} inurl:"/.well-known/jwks.json" OR inurl:"openid-configuration"',category:'auth'},

// === Elite / 0.01% ===
{title:'Source Maps',desc:'JavaScript source maps revealing original source paths',query:'site:{TARGET} ext:map intext:"sources"',category:'code'},
{title:'Frontend Secrets',desc:'Secrets and keys embedded in JS bundles',query:'site:{TARGET} ext:js intext:"apiKey" OR intext:"clientSecret"',category:'secrets'},
{title:'Feature Flags',desc:'Feature flag service configs and keys',query:'site:{TARGET} intext:"launchdarkly" OR intext:"unleash"',category:'config'},
{title:'Internal APIs',desc:'Private/internal endpoints and paths',query:'site:{TARGET} inurl:"/internal/" OR inurl:"/private/"',category:'api'},
{title:'Legacy APIs',desc:'Deprecated API versions and legacy routes',query:'site:{TARGET} inurl:"/v0/" OR inurl:"/legacy"',category:'api'},
{title:'SOAP/WSDL',desc:'SOAP service descriptors and WSDL endpoints',query:'site:{TARGET} ext:wsdl OR inurl:"?wsdl"',category:'api'},
{title:'GraphQL Introspection',desc:'GraphQL schema leaks and __schema exposure',query:'site:{TARGET} intext:"__schema" OR intext:"__typename"',category:'api'},
{title:'Firebase / Supabase',desc:'Serverless backend URLs and exposed configs',query:'site:{TARGET} intext:"firebaseio.com" OR intext:"supabase.co"',category:'cloud'},
{title:'Artifact Registries',desc:'Artifactory/Nexus repos and artifacts',query:'site:{TARGET} intext:"artifactory" OR intext:"nexus"',category:'devops'},
{title:'Kube Secrets',desc:'Kubernetes Secret manifests and values.yaml leaks',query:'site:{TARGET} ext:yaml intext:"kind: Secret"',category:'secrets'},
{title:'Helm Charts',desc:'Helm chart values and defaults exposing secrets',query:'site:{TARGET} intext:"values.yaml"',category:'devops'},
{title:'Message Brokers',desc:'Kafka, RabbitMQ endpoints and creds',query:'site:{TARGET} intext:"Kafka" OR intext:"RabbitMQ"',category:'infrastructure'},
{title:'Search Consoles',desc:'Kibana/Splunk consoles and dashboards',query:'site:{TARGET} intext:"Kibana" OR intext:"Splunk"',category:'monitoring'},
{title:'Error Trackers',desc:'Sentry, NewRelic DSNs and error tracker configs',query:'site:{TARGET} intext:"sentry_dsn" OR intext:"newrelic"',category:'monitoring'},
{title:'Desktop Updaters',desc:'Electron update feeds and RELEASE files',query:'site:{TARGET} intext:"latest.yml" OR intext:"RELEASES"',category:'files'},
{title:'Firmware Images',desc:'Embedded firmware images and binary blobs',query:'site:{TARGET} ext:bin OR ext:img OR ext:firmware',category:'files'},
{title:'Shadow IT SaaS',desc:'Notion/Airtable/Miro instances used by org',query:'site:{TARGET} intext:"notion.so" OR intext:"airtable" OR intext:"miro.com"',category:'saas'},
{title:'Webhook Endpoints',desc:'Third-party webhook URLs (Zapier/IFTTT) leaking hooks',query:'site:{TARGET} intext:"hooks.zapier.com" OR intext:"maker.ifttt.com"',category:'api'},
{title:'CDN Origins',desc:'CDN origin hostnames and origin headers',query:'site:{TARGET} intext:"cloudfront.net" intext:"origin"',category:'infrastructure'},
{title:'VPN / MDM',desc:'VPN portals and MDM/Intune consoles',query:'site:{TARGET} intext:"AnyConnect" OR intext:"Intune"',category:'infrastructure'},
{title:'Secrets Backups',desc:'Vault snapshots and backup dumps containing secrets',query:'site:{TARGET} intext:"vault snapshot"',category:'secrets'},
{title:'Time-Series DBs',desc:'InfluxDB/Chronograf endpoints and data',query:'site:{TARGET} intext:"InfluxDB" OR intext:"Chronograf"',category:'database'},
{title:'Internal Docs',desc:'Design docs, ADRs and internal architecture notes',query:'site:{TARGET} intext:"Architecture Decision Record" OR intext:"ADR-"',category:'documents'},

// === Tech Stack Specifics ===
{title:'Spring Boot Actuators',desc:'Exposed Spring Boot actuator endpoints and diagnostics',query:'site:{TARGET} inurl:/actuator/ OR inurl:/actuator/env OR inurl:/actuator/heapdump OR inurl:/jolokia',category:'vulns'},
{title:'Laravel Debug',desc:'Laravel debug pages and Whoops error output',query:'site:{TARGET} intext:"Laravel" intext:"Whoops! There was an error."',category:'vulns'},
{title:'Django Debug',desc:'Django debug pages and DEBUG=True exposures',query:'site:{TARGET} intext:"DisallowedHost" OR intext:"DEBUG = True"',category:'vulns'},
{title:'Rails Info',desc:'Rails info pages and mailer/route disclosures',query:'site:{TARGET} inurl:"/rails/info/routes" OR inurl:"/rails/mailers"',category:'vulns'},
{title:'PHP Info',desc:'Exposed phpinfo() pages revealing PHP config',query:'site:{TARGET} ext:php intitle:"phpinfo()" "PHP Version"',category:'vulns'},

// === SaaS & External Leaks ===
{title:'Public Trello Boards',desc:'Public Trello boards mentioning the target',query:'site:trello.com "{TARGET}"',category:'saas'},
{title:'Postman Collections',desc:'Leaked Postman API collections and credentials',query:'site:postman.com "{TARGET}" OR site:documenter.getpostman.com "{TARGET}"',category:'api'},
{title:'Code Sandboxes',desc:'Snippets in JSFiddle/CodePen/CodeSandbox referencing target',query:'site:jsfiddle.net "{TARGET}" OR site:codepen.io "{TARGET}" OR site:repl.it "{TARGET}" OR site:codesandbox.io "{TARGET}"',category:'code'},
{title:'Pastebin Alternatives',desc:'Pastes and archived paste content mentioning target',query:'site:paste.org "{TARGET}" OR site:ghostbin.com "{TARGET}" OR site:archive.org "pastebin.com" "{TARGET}"',category:'code'},
{title:'Google Groups',desc:'Mailing list posts and group discussions',query:'site:groups.google.com "{TARGET}"',category:'reconnaissance'},
{title:'S3/Cloud Takeover',desc:'Bucket takeover indicators and missing buckets',query:'site:{TARGET} "The specified bucket does not exist" OR "NoSuchBucket" OR "BlobNotFound"',category:'vulns'},

// === Vuln Patterns ===
{title:'Open Redirects',desc:'Common redirect parameters prone to open redirect',query:'site:{TARGET} inurl:url= OR inurl:return= OR inurl:next= OR inurl:redir= OR inurl:dest= OR inurl:target=',category:'vulns'},
{title:'XSS Sinks',desc:'Parameters often vulnerable to reflected/stored XSS',query:'site:{TARGET} inurl:q= OR inurl:s= OR inurl:search= OR inurl:query= OR inurl:keyword= OR inurl:lang=',category:'vulns'},
{title:'IDOR / Enumeration',desc:'Numeric IDs and predictable identifiers for enumeration',query:'site:{TARGET} inurl:id= OR inurl:user= OR inurl:profile= OR inurl:order=',category:'vulns'},
{title:'File Uploads',desc:'Upload endpoints and file-import interfaces',query:'site:{TARGET} inurl:upload OR inurl:import OR intext:"choose file"',category:'vulns'},

// === Mobile & Assets ===
{title:'Mobile Apps',desc:'App Store / Play Store listings and bundle metadata',query:'site:play.google.com "{TARGET}" OR site:apps.apple.com "{TARGET}"',category:'reconnaissance'},
{title:'Assets & Fonts',desc:'Font files and static assets that may leak info',query:'site:{TARGET} ext:ttf OR ext:otf OR ext:woff OR ext:woff2 OR ext:eot',category:'files'},

// === Cloud & Serverless ===
{title:'Lambda/Function URLs',desc:'Serverless function invoke URLs (AWS Lambda/execute-api)',query:'site:{TARGET} "amazonaws.com" "lambda" OR "execute-api"',category:'cloud'},
{title:'Cloudflare Workers',desc:'Cloudflare Workers endpoints and worker.dev hosts',query:'site:{TARGET} intext:"workers.dev" OR intext:"cloudflare-worker"',category:'cloud'},
{title:'Vercel/Netlify',desc:'Vercel/Netlify deploys, previews and site domains',query:'site:{TARGET} intext:"vercel.app" OR intext:"netlify.app" OR intext:"onrender.com"',category:'cloud'},
{title:'Firebase Configs',desc:'Client-side firebase config objects exposing keys',query:'site:{TARGET} intext:"firebaseConfig" OR intext:"apiKey.*firebase"',category:'cloud'},
{title:'Azure Functions',desc:'Azure Functions apps and function endpoints',query:'site:{TARGET} intext:"azurewebsites.net" OR intext:"functionapp"',category:'cloud'},
{title:'GCP Cloud Run/Functions',desc:'Google Cloud Run/Functions endpoints and URLs',query:'site:{TARGET} intext:"run.app" OR intext:"cloudfunctions.net"',category:'cloud'},
{title:'Supabase Configs',desc:'Supabase project URLs and public keys',query:'site:{TARGET} intext:"supabaseUrl" OR intext:"supabaseKey"',category:'cloud'},
{title:'Vercel Envs',desc:'Exposed Vercel/Next/Vite public env variables (NEXT_PUBLIC_/VITE_)',query:'site:{TARGET} intext:"NEXT_PUBLIC_" OR intext:"VITE_"',category:'secrets'},

// === Modern Secrets ===
{title:'GitHub Fine-grained Tokens',desc:'GitHub fine-grained PATs and token patterns',query:'site:{TARGET} intext:"github_pat_"',category:'secrets'},
{title:'GitLab Pipeline Vars',desc:'GitLab CI tokens and pipeline variables',query:'site:{TARGET} intext:"CI_JOB_TOKEN" OR intext:"CI_ACCESS_TOKEN"',category:'secrets'},
{title:'Datadog Keys',desc:'Datadog API/ingest keys found in files',query:'site:{TARGET} intext:"datadoghq.com" intext:"DD-API-KEY"',category:'secrets'},
{title:'New Relic License Keys',desc:'New Relic license/agent keys in repos',query:'site:{TARGET} intext:"NEW_RELIC_LICENSE_KEY"',category:'secrets'},
{title:'OpenAI API Keys',desc:'OpenAI secret keys and SDK leaks (sk-...)',query:'site:{TARGET} intext:"sk-" intext:"openai"',category:'secrets'},
{title:'Anthropic Keys',desc:'Anthropic API keys and related tokens',query:'site:{TARGET} intext:"sk-ant-"',category:'secrets'},
{title:'HuggingFace Tokens',desc:'HuggingFace API tokens and creds (hf_)',query:'site:{TARGET} intext:"hf_"',category:'secrets'},
{title:'Docker Hub Tokens',desc:'Docker Hub PATs and registry tokens',query:'site:{TARGET} intext:"dckr_pat_"',category:'secrets'},
{title:'HashiCorp Vault Tokens',desc:'Vault tokens, snapshots or token markers',query:'site:{TARGET} intext:"hvs." OR intext:"vault token"',category:'secrets'},
{title:'CircleCI Contexts',desc:'CircleCI tokens and context variable leaks',query:'site:{TARGET} intext:"CIRCLECI_TOKEN" OR intext:"CIRCLE_TOKEN"',category:'secrets'},
{title:'Terraform Cloud Tokens',desc:'Terraform Cloud/TFC token references and app.terraform.io',query:'site:{TARGET} intext:"TFC_TOKEN" OR intext:"app.terraform.io"',category:'secrets'},
{title:'Buildkite Tokens',desc:'Buildkite pipeline and API tokens',query:'site:{TARGET} intext:"BUILDKITE_TOKEN"',category:'secrets'},

// === Mobile & APIs ===
{title:'APK Decompiled',desc:'Public APK/IPA files and downloadable app packages',query:'site:{TARGET} ext:apk OR ext:ipa',category:'files'},
{title:'iOS/Android Manifests',desc:'Mobile manifest files (Info.plist/AndroidManifest.xml)',query:'site:{TARGET} intext:"Info.plist" OR intext:"AndroidManifest.xml"',category:'config'},
{title:'In-App Purchase Keys',desc:'IAP/purchase keys or purchase_key artifacts',query:'site:{TARGET} intext:"IAP" OR intext:"purchase_key"',category:'secrets'},
{title:'Google Services JSON',desc:'google-services.json files containing Firebase creds',query:'site:{TARGET} intext:"google-services.json"',category:'config'},
{title:'Apple P8 Keys',desc:'Apple .p8/PRIVATE KEY files used for APNs/Auth',query:'site:{TARGET} intext:"BEGIN PRIVATE KEY" intext:"AUTHKEY"',category:'secrets'},

// === IAC & DevOps ===
{title:'Pulumi Stacks',desc:'Pulumi stack files and JSON state containing config',query:'site:{TARGET} intext:"pulumi" ext:json',category:'devops'},
{title:'Ansible Vaults',desc:'Ansible Vault-encrypted files and vault markers',query:'site:{TARGET} ext:yml intext:"$ANSIBLE_VAULT"',category:'secrets'},
{title:'Chef Secrets',desc:'Chef encrypted data bags and secret references',query:'site:{TARGET} intext:"encrypted_data_bag"',category:'secrets'},
{title:'GitOps Repos',desc:'Flux/Argo CD repos, manifests and K8s resources',query:'site:{TARGET} intext:"fluxcd" OR intext:"argocd"',category:'devops'},
{title:'Helm Repos',desc:'Helm charts, values and repo manifests',query:'site:{TARGET} intext:"helm repo" ext:yaml',category:'devops'},
{title:'SOPS Files',desc:'SOPS-encrypted files and key markers',query:'site:{TARGET} intext:"sops" ext:yaml OR ext:json',category:'secrets'},
{title:'Terraform Variables',desc:'Terraform .tfvars files and variable leaks',query:'site:{TARGET} ext:tfvars OR ext:auto.tfvars',category:'secrets'},

// === P1/P2 ===
{title:'CORS Misconfigs',desc:'Permissive CORS headers and risky combos',query:'site:{TARGET} intext:"Access-Control-Allow-Origin: *" intext:"Access-Control-Allow-Credentials: true"',category:'vulns'},
{title:'SQL Errors Deep',desc:'Database error messages and SQL stack traces',query:'site:{TARGET} intext:"SQLSTATE" OR intext:"PDOException" OR intext:"ORA-" OR intext:"PL/SQL"',category:'vulns'},
{title:'SSRF Indicators',desc:'Endpoints taking external URLs indicating SSRF risk',query:'site:{TARGET} inurl:url= OR inurl:dest= OR inurl:redirect=',category:'vulns'},
{title:'JWT Tokens in URLs',desc:'JWTs and access tokens passed in query strings',query:'site:{TARGET} inurl:"access_token=" OR inurl:"id_token="',category:'secrets'},
{title:'GraphQL Batching',desc:'GraphQL batching and persisted query indicators',query:'site:{TARGET} intext:"extensions" intext:"persistedQuery"',category:'api'},
{title:'Cache Poisoning',desc:'Cache/proxy headers and X-Forwarded-Host indicators',query:'site:{TARGET} intext:"X-Cache" OR intext:"X-Forwarded-Host"',category:'vulns'},

// === Alternative Leaks ===
{title:'Telegram Leaks',desc:'Telegram channels/messages referencing the target',query:'site:t.me "{TARGET}"',category:'saas'},
{title:'Discord Attachments',desc:'Discord CDN attachments and uploaded files',query:'site:cdn.discordapp.com "{TARGET}"',category:'saas'},
{title:'Gists Modern',desc:'GitHub Gists referencing target or creds',query:'site:gist.github.com "{TARGET}"',category:'code'},
{title:'Bitbucket Snippets',desc:'Bitbucket snippets containing code or secrets',query:'site:bitbucket.org/snippets "{TARGET}"',category:'code'},
{title:'Codeberg',desc:'Codeberg repositories and snippets mentioning target',query:'site:codeberg.org "{TARGET}"',category:'code'},
{title:'Sourcehut',desc:'sourcehut (sr.ht) hosted code and snippets',query:'site:sr.ht "{TARGET}"',category:'code'},
{title:'GitLab Snippets',desc:'GitLab snippet pages with possible secret leaks',query:'site:gitlab.com/snippets "{TARGET}"',category:'code'},
{title:'Private Package Registries',desc:'References to private package registries and scoped packages',query:'site:{TARGET} intext:"npm.pkg.github.com" OR intext:"pkg.coding.net"',category:'code'},

// === High Impact ===
{title:'Chrome Extensions',desc:'Chrome Web Store extension pages and manifests',query:'site:chrome.google.com/webstore/detail "{TARGET}"',category:'reconnaissance'},
{title:'Windows Registry',desc:'Exported .reg files and registry content mentioning target',query:'site:{TARGET} intext:"Windows Registry Editor" ext:reg',category:'files'},
{title:'Systemd Services',desc:'systemd unit/service files revealing service configs',query:'site:{TARGET} intext:"[Unit]" intext:"[Service]"',category:'config'},
{title:'NPM Package Info',desc:'NPM registry package pages and metadata',query:'site:registry.npmjs.org/{TARGET}',category:'reconnaissance'},
{title:'PyPI Packages',desc:'PyPI project pages and release info',query:'site:pypi.org/project/{TARGET}',category:'reconnaissance'},
{title:'Maven Repositories',desc:'Maven artifact pages and group/artifact info',query:'site:mvnrepository.com/artifact/{TARGET}',category:'reconnaissance'},
{title:'Docker Images',desc:'Docker Hub repos and image metadata for target',query:'site:hub.docker.com/r/{TARGET}',category:'reconnaissance'},
{title:'Swagger Aggregators',desc:'Aggregated Swagger/OpenAPI bundles exposing endpoints',query:'site:{TARGET} intext:"swagger-ui-bundle.js"',category:'api'},
{title:'WSO2 Exposures',desc:'WSO2 management consoles and carbon endpoints',query:'site:{TARGET} intext:"WSO2" OR inurl:"/carbon"',category:'infrastructure'},
{title:'SAP Configs',desc:'SAP system/config files and references',query:'site:{TARGET} intext:"sap-system" OR intext:"sap-config"',category:'config'},

// == Specific Leaks ==
{title:'OAuth Auth Codes',desc:'Leaked OAuth authorization codes in logs or URLs',query:'site:{TARGET} intext:"code=" inurl:callback OR inurl:oauth',category:'secrets'},
{title:'SAML Assertions',desc:'Exposed SAML responses containing user attributes',query:'site:{TARGET} intext:"<saml:Assertion" OR intext:"SAMLResponse="',category:'auth'},
{title:'Real IP Leaks',desc:'Server IPs exposed via headers or misconfigs',query:'site:{TARGET} intext:"X-Forwarded-For: 10." OR intext:"X-Real-IP: 172." OR intext:"Via: nginx" -cloudflare',category:'infrastructure'},
{title:'WAF Rules Leak',desc:'Cloudflare/Akamai rule IDs or error pages',query:'site:{TARGET} intext:"Ray ID" OR intext:"Akamai Error Reference"',category:'infrastructure'},
{title:'IoT Devices',desc:'Exposed webcams, routers, and IoT dashboards',query:'site:{TARGET} intitle:"webcam" OR intitle:"router" OR intext:"Hikvision" OR intext:"Dahua"',category:'infrastructure'},
{title:'Industrial Control',desc:'SCADA/HMI web interfaces (rare but critical)',query:'site:{TARGET} intext:"Modbus" OR intext:"Siemens SIMATIC" OR intitle:"WinCC"',category:'infrastructure'},
{title:'Test Reports',desc:'Automated test reports with screenshots/logs',query:'site:{TARGET} intext:"playwright-report" OR intext:"cypress/report" OR inurl:"/__screenshots/"',category:'logs'},
{title:'Mock Services',desc:'WireMock/Mockoon configs exposing real endpoints',query:'site:{TARGET} intext:"wiremock" OR intext:"mockoon" OR inurl:"/__admin/"',category:'devops'},
{title:'NoSQL Admins',desc:'NoSQL database web consoles',query:'site:{TARGET} intext:"Mongo Express" OR intext:"Redis Commander" OR intext:"Cassandra Reaper"',category:'database'},
{title:'Elasticsearch Data',desc:'ES indices and Kibana saved objects',query:'site:{TARGET} intext:"_cat/indices" OR inurl:"/.kibana/"',category:'database'},
{title:'Data Science Envs',desc:'Exposed Jupyter/RStudio instances',query:'site:{TARGET} intitle:"Jupyter Notebook" OR intext:"RStudio Server"',category:'infrastructure'},
{title:'OpenAPI Specs',desc:'Raw OpenAPI/Swagger JSON/YAML specs',query:'site:{TARGET} ext:yaml OR ext:json intext:"openapi:" OR intext:"swagger:" -intext:"swagger-ui-bundle.js"',category:'api'},
{title:'Private Package Registries',desc:'Go/Rust/.NET private package repos',query:'site:{TARGET} intext:"proxy.golang.org" OR intext:"crates.io" OR intext:"nuget.org"',category:'code'},
{title:'SSRF Payloads in Logs',desc:'SSRF attempts captured in public logs',query:'site:{TARGET} ext:log intext:"http://192.168." OR intext:"file:///etc/passwd"',category:'logs'},
{title:'Medical Data APIs',desc:'Exposed healthcare data endpoints',query:'site:{TARGET} intext:"DICOM" OR intext:"HL7" OR inurl:"/fhir/"',category:'api'},
{title:'GIS Services',desc:'Exposed geospatial map servers',query:'site:{TARGET} intext:"GeoServer" OR intext:"MapServer" OR inurl:"/geoserver/"',category:'infrastructure'},

// === Identity & Auth (Advanced) ===
{title:'OAuth PKCE Verifier Leaks',desc:'Leaked code_verifier or code_challenge in URLs/logs',query:'site:{TARGET} intext:"code_verifier=" OR intext:"code_challenge="',category:'secrets'},
{title:'OIDC ID Tokens',desc:'Exposed OpenID Connect ID tokens (JWT)',query:'site:{TARGET} intext:"eyJhbGciOiJSUzI1Ni" intext:"openid"',category:'secrets'},
{title:'Auth0 Tenant Exposures',desc:'Auth0 custom domain or tenant misconfigs',query:'site:{TARGET} intext:".auth0.com" -login -cdn',category:'auth'},

// === Cloud & Serverless (Deep) ===
{title:'AWS AppSync APIs',desc:'Exposed GraphQL APIs via AWS AppSync',query:'site:{TARGET} intext:"appsync-api" intext:"amazonaws.com"',category:'cloud'},
{title:'Google API Gateway',desc:'GCP API Gateway configs or endpoints',query:'site:{TARGET} intext:"gateway.dev" OR intext:"apigateway.googleapis.com"',category:'cloud'},
{title:'Azure Blob Directories',desc:'Listable Azure Blob Storage containers',query:'site:{TARGET} intext:"blob.core.windows.net" intitle:"Index of"',category:'cloud'},

// === Developer Tooling & IDEs ===
{title:'Replit Projects',desc:'Public Replit projects referencing target',query:'site:replit.com "{TARGET}"',category:'code'},
{title:'StackBlitz Workspaces',desc:'Exposed StackBlitz dev environments',query:'site:stackblitz.com "{TARGET}"',category:'code'},
{title:'GitPod Configs',desc:'GitPod .gitpod.yml files with env/secrets',query:'site:{TARGET} intext:".gitpod.yml"',category:'config'},
{title:'Expo Snack',desc:'React Native Expo Snack embeds with secrets',query:'site:snack.expo.dev "{TARGET}"',category:'code'},

// === CI/CD & Build Systems (Niche) ===
{title:'Drone CI',desc:'Drone CI config and build logs',query:'site:{TARGET} intext:".drone.yml" OR inurl:"/drone/"',category:'devops'},
{title:'TeamCity Builds',desc:'Exposed TeamCity build configurations',query:'site:{TARGET} inurl:"/teamcity/"',category:'devops'},
{title:'Bamboo Specs',desc:'Atlassian Bamboo plan specs',query:'site:{TARGET} intext:"bamboo-specs"',category:'devops'},

// === Secrets in Non-Standard Places ===
{title:'Browser Extension Backgrounds',desc:'Leaked keys in Chrome extension background scripts',query:'site:{TARGET} ext:js intext:"chrome.runtime" intext:"api_key"',category:'secrets'},
{title:'PDF Metadata',desc:'Author/org info in PDF document properties',query:'site:{TARGET} ext:pdf intext:"{TARGET}"',category:'documents'},
{title:'EXIF Geotags',desc:'Geolocation leaks in public images',query:'site:{TARGET} ext:jpg OR ext:jpeg intext:"gps"',category:'files'},

// === Database & Cache (Extended) ===
{title:'Memcached Stats',desc:'Exposed Memcached stats pages',query:'site:{TARGET} intext:"STAT version" OR intext:"memcached"',category:'database'},
{title:'etcd Browser',desc:'Web UI for etcd key-value store',query:'site:{TARGET} intext:"etcd-browser"',category:'database'},
{title:'ArangoDB Web Interface',desc:'ArangoDB admin console exposure',query:'site:{TARGET} intitle:"ArangoDB Web Interface"',category:'database'},

// === Compliance & Regulated Data ===
{title:'PCI DSS Artifacts',desc:'Payment card data or PCI-related docs',query:'site:{TARGET} intext:"card_number" OR intext:"CVV" OR intext:"PCI DSS"',category:'documents'},
{title:'GDPR DSAR Logs',desc:'Data Subject Access Request portals/logs',query:'site:{TARGET} intext:"DSAR" OR intext:"right of access"',category:'documents'},
{title:'HIPAA PHI Indicators',desc:'Protected Health Information markers',query:'site:{TARGET} intext:"PHI" OR intext:"patient_id" OR intext:"medical record"',category:'documents'},

// === Legacy & Obscure Tech ===
{title:'WebLogic Console',desc:'Oracle WebLogic Server consoles',query:'site:{TARGET} inurl:"/console/" intitle:"WebLogic"',category:'infrastructure'},
{title:'JBoss JMX Invoker',desc:'JBoss management interfaces',query:'site:{TARGET} inurl:"jmx-console" OR inurl:"web-console"',category:'infrastructure'},
{title:'ColdFusion Admin',desc:'Adobe ColdFusion administrator panels',query:'site:{TARGET} inurl:"CFIDE/administrator"',category:'infrastructure'},

// === Mobile & Reverse Engineering ===
{title:'Firebase Crashlytics',desc:'Crash reports with stack traces/device info',query:'site:{TARGET} intext:"crashlytics.com"',category:'logs'},
{title:'Mobile Debug Symbols',desc:'dSYM or .pdb files with debug info',query:'site:{TARGET} ext:dSYM OR ext:pdb',category:'files'},
{title:'Flutter/Dart Source Maps',desc:'Source maps for Flutter web apps',query:'site:{TARGET} ext:json intext:"sourceRoot" intext:"main.dart"',category:'code'},

// === Monitoring & Observability ===
{title:'Datadog Dashboards',desc:'Public Datadog dashboards or embeds',query:'site:{TARGET} intext:"datadoghq.com/app/dashboard"',category:'monitoring'},
{title:'New Relic One Pages',desc:'Exposed New Relic One custom pages',query:'site:{TARGET} intext:"newrelic.com/nr1-apps"',category:'monitoring'},
{title:'Loki/Promtail Logs',desc:'Grafana Loki log ingestion endpoints',query:'site:{TARGET} intext:"loki/api/v1/push"',category:'logs'},

// === Edge Infrastructure ===
{title:'Fastly/Varnish Caches',desc:'Cache control headers or purge interfaces',query:'site:{TARGET} intext:"X-Varnish" OR intext:"Fastly-Debug"',category:'infrastructure'},
{title:'Traefik Dashboard',desc:'Exposed Traefik reverse proxy UI',query:'site:{TARGET} intitle:"Traefik" inurl:"/dashboard/"',category:'infrastructure'},
{title:'Envoy Admin',desc:'Envoy proxy admin interface',query:'site:{TARGET} inurl:"/stats" intext:"envoy"',category:'infrastructure'},

// === Alternative Code Hosting ===
{title:'Launchpad Bazaar',desc:'Ubuntu Launchpad Bazaar repos',query:'site:launchpad.net "{TARGET}"',category:'code'},
{title:'Phabricator Repos',desc:'Phabricator Diffusion repositories',query:'site:{TARGET} inurl:"/diffusion/"',category:'code'},
{title:'Gitea/Gogs Instances',desc:'Self-hosted Gitea/Gogs servers',query:'site:{TARGET} intitle:"Gitea" OR intitle:"Gogs"',category:'code'},

// === AI/ML Ops ===
{title:'MLflow Tracking',desc:'ML experiment tracking UIs',query:'site:{TARGET} intitle:"MLflow"',category:'infrastructure'},
{title:'Weights & Biases',desc:'W&B project dashboards',query:'site:{TARGET} intext:"wandb.ai"',category:'saas'},
{title:'TensorBoard Instances',desc:'Exposed TensorBoard dashboards',query:'site:{TARGET} intitle:"TensorBoard"',category:'infrastructure'},

// === Email & Collaboration ===
{title:'Mailgun Webhooks',desc:'Mailgun event webhook endpoints',query:'site:{TARGET} intext:"mailgun.org/webhooks"',category:'api'},
{title:'SendGrid Event Webhooks',desc:'SendGrid webhook configurations',query:'site:{TARGET} intext:"sendgrid.com/event/webhook"',category:'api'},
{title:'Calendly Embeds',desc:'Calendly scheduling pages with org context',query:'site:{TARGET} intext:"calendly.com"',category:'saas'},

// === Zero Trust & Access ===
{title:'BeyondCorp Enterprise',desc:'Google BeyondCorp access gateways',query:'site:{TARGET} intext:"beyondcorp" OR intext:"accesscontextmanager"',category:'infrastructure'},
{title:'Zscaler Client Connector',desc:'Zscaler private access portals',query:'site:{TARGET} intext:"zscaler" intext:"private-access"',category:'infrastructure'},
{title:'Cloudflare Access Apps',desc:'Cloudflare Access-protected app login pages',query:'site:{TARGET} intext:"login.cfaccess.org"',category:'infrastructure'},

// === File Extensions & Formats ===
{title:'Web Source Files',desc:'Web application source code files',query:'site:{TARGET} ext:php OR ext:aspx OR ext:asp OR ext:jsp OR ext:jspx OR ext:do OR ext:action OR ext:cgi OR ext:pl OR ext:cfm OR ext:html OR ext:htm OR ext:xhtml OR ext:shtml OR ext:js OR ext:jsx OR ext:ts OR ext:tsx OR ext:vue OR ext:svelte',category:'code'},
{title:'Backend Source Code',desc:'Backend programming language source files',query:'site:{TARGET} ext:py OR ext:rb OR ext:go OR ext:rs OR ext:java OR ext:cs OR ext:scala OR ext:kt OR ext:kts OR ext:clj OR ext:cljs OR ext:elixir OR ext:exs OR ext:erl OR ext:hs OR ext:lisp OR ext:r OR ext:m OR ext:swift OR ext:pas OR ext:f OR ext:for OR ext:f90',category:'code'},
{title:'Configuration Files',desc:'Various configuration file formats',query:'site:{TARGET} ext:toml OR ext:yml OR ext:yaml OR ext:hcl OR ext:hcl.json OR ext:properties OR ext:env OR dotenv OR dotenv.local OR .env.example OR ext:rc OR .npmrc OR .pypirc OR .yarnrc OR .babelrc OR ext:config OR ext:ini OR ext:conf OR ext:cfg',category:'config'},
{title:'Data & Serialization Files',desc:'Data storage and serialization formats',query:'site:{TARGET} ext:json OR ext:jsonl OR ext:json5 OR ext:xml OR ext:yaml OR ext:yml OR ext:toml OR ext:csv OR ext:tsv OR ext:parquet OR ext:avro OR ext:orc OR ext:feather OR ext:hdf5 OR ext:h5 OR ext:msgpack OR ext:bson',category:'files'},
{title:'Database Files',desc:'Database files and dumps',query:'site:{TARGET} ext:db OR ext:sqlite OR ext:sqlite3 OR ext:mdb OR ext:accdb OR ext:fdb OR ext:sql OR ext:dmp OR ext:dump OR ext:backup OR ext:bak',category:'database'},
{title:'Image Files',desc:'Image and graphic file formats',query:'site:{TARGET} ext:jpg OR ext:jpeg OR ext:png OR ext:gif OR ext:bmp OR ext:tiff OR ext:tif OR ext:webp OR ext:svg OR ext:ico OR ext:icns OR ext:heic OR ext:heif OR ext:raw OR ext:cr2 OR ext:nef OR ext:arw OR ext:psd OR ext:ai OR ext:eps OR ext:indd OR ext:sketch OR ext:fig OR ext:xd',category:'files'},
{title:'Document Files',desc:'Office and document file formats',query:'site:{TARGET} ext:pdf OR ext:doc OR ext:docx OR ext:odt OR ext:rtf OR ext:txt OR ext:md OR ext:markdown OR ext:rst OR ext:tex OR ext:latex OR ext:pages OR ext:key OR ext:keynote OR ext:numbers OR ext:xls OR ext:xlsx OR ext:ods OR ext:csv OR ext:ppt OR ext:pptx OR ext:odp',category:'documents'},
{title:'Archive & Compression',desc:'Archive and compressed file formats',query:'site:{TARGET} ext:zip OR ext:rar OR ext:7z OR ext:tar OR ext:gz OR ext:tgz OR ext:bz2 OR ext:tbz2 OR ext:xz OR ext:txz OR ext:z OR ext:lz OR ext:lzma OR ext:lzo OR ext:rz OR ext:sz OR ext:arc OR ext:arj OR ext:cpio OR ext:shar OR ext:iso OR ext:img OR ext:dmg',category:'files'},
{title:'Binary & Executable Files',desc:'Binary and executable file formats',query:'site:{TARGET} ext:exe OR ext:dll OR ext:so OR ext:dylib OR ext:bin OR ext:elf OR ext:app OR ext:apk OR ext:ipa OR ext:deb OR ext:rpm OR ext:msi OR ext:pkg OR ext:run OR ext:sh OR ext:bat OR ext:cmd OR ext:ps1 OR ext:vbs OR ext:jar OR ext:war OR ext:ear OR ext:class OR ext:pyc OR ext:pyo OR ext:o OR ext:obj OR ext:ko',category:'files'},
{title:'Media Files',desc:'Audio and video file formats',query:'site:{TARGET} ext:mp3 OR ext:wav OR ext:flac OR ext:aac OR ext:m4a OR ext:ogg OR ext:oga OR ext:opus OR ext:mp4 OR ext:avi OR ext:mov OR ext:wmv OR ext:flv OR ext:mkv OR ext:webm OR ext:mpeg OR ext:mpg OR ext:m4v OR ext:3gp OR ext:ogv',category:'files'},
{title:'Virtualization & Container',desc:'Virtual machine and container files',query:'site:{TARGET} ext:ova OR ext:ovf OR ext:vmdk OR ext:vdi OR ext:vhd OR ext:vhdx OR ext:qcow2 OR ext:box OR ext:vagrantfile OR ext:dockerfile OR ext:docker-compose.yml',category:'devops'},
{title:'CAD & 3D Models',desc:'CAD and 3D modeling files',query:'site:{TARGET} ext:stl OR ext:obj OR ext:fbx OR ext:3ds OR ext:max OR ext:blend OR ext:mb OR ext:ma OR ext:dxf OR ext:dwg OR ext:step OR ext:iges OR ext:iges OR ext:stp OR ext:sldprt OR ext:sldasm',category:'files'},
{title:'Font Files',desc:'Font and typeface files',query:'site:{TARGET} ext:ttf OR ext:otf OR ext:woff OR ext:woff2 OR ext:eot OR ext:fon OR ext:fnt OR ext:pfb OR ext:pfm',category:'files'},
{title:'GIS & Geospatial',desc:'Geospatial and mapping data files',query:'site:{TARGET} ext:shp OR ext:shx OR ext:dbf OR ext:prj OR ext:kml OR ext:kmz OR ext:gpx OR ext:geojson OR ext:topojson OR ext:tiff OR ext:tif OR ext:dem OR ext:dtm OR ext:dsm',category:'files'},
{title:'E-Book Formats',desc:'E-book and digital publication formats',query:'site:{TARGET} ext:epub OR ext:mobi OR ext:azw3 OR ext:fb2 OR ext:ibooks OR ext:djvu OR ext:cbr OR ext:cbz',category:'documents'},
{title:'System & Log Files',desc:'System and log file formats',query:'site:{TARGET} ext:log OR ext:syslog OR ext:journal OR ext:audit OR ext:evtx OR ext:etl OR ext:pcap OR ext:cap OR ext:har OR ext:crash OR ext:dump OR ext:core OR ext:minidump',category:'logs'},
{title:'Network Configuration',desc:'Network configuration and packet files',query:'site:{TARGET} ext:pcap OR ext:cap OR ext:pcapng OR ext:har OR ext:curl OR ext:wget OR ext:ssh OR ext:ppk OR ext:ovpn OR ext:conf OR ext:config',category:'config'},
{title:'Backup Files',desc:'Backup and temporary file formats',query:'site:{TARGET} ext:bak OR ext:backup OR ext:old OR ext:tmp OR ext:temp OR ext:swp OR ext:swo OR ext:swn OR ext:~ OR ext:bkp OR ext:save OR ext:prev OR ext:orig OR ext:dist',category:'backups'},

// === Specific Language Extensions ===
{title:'Less Common Languages',desc:'Source files in less common programming languages',query:'site:{TARGET} ext:lua OR ext:ada OR ext:adb OR ext:ads OR ext:asm OR ext:s OR ext:inc OR ext:forth OR ext:4th OR ext:fth OR ext:f83 OR ext:cob OR ext:cobol OR ext:d OR ext:dart OR ext:ex OR exs OR ext:f OR ext:f77 OR ext:factor OR ext:falcon OR ext:forth OR ext:fortran OR ext:groovy OR ext:gy OR ext:hack OR ext:hh OR ext:haxe OR ext:hx OR ext:idl OR ext:idl OR ext:julia OR ext:jl OR ext:kotlin OR ext:kt OR ext:kts OR ext:limbo OR ext:b OR ext:modula2 OR ext:mod OR def OR ext:m2 OR ext:nim OR ext:nix OR ext:ocaml OR ext:ml OR ext:mli OR ext:perl OR ext:pl OR ext:pm OR ext:p6 OR ext:pl6 OR ext:pm6 OR ext:prolog OR ext:pl OR ext:pro OR ext:pascal OR ext:pas OR ext:pp OR ext:perl OR ext:php OR ext:php3 OR ext:php4 OR ext:php5 OR ext:php7 OR ext:phtml OR ext:postscript OR ext:ps OR ext:pure OR ext:pyret OR ext:rkt OR ext:scheme OR ext:scm OR ext:ss OR ext:smalltalk OR ext:st OR ext:tcl OR ext:tk OR ext:vala OR ext:vapi OR ext:vb OR ext:bas OR ext:frm OR ext:vbs OR ext:verilog OR ext:v OR ext:vhdl OR ext:vhd OR ext:whitespace OR ext:ws',category:'code'},

// === Web Development ===
{title:'PHP Files',desc:'PHP files',query:'site:{TARGET} ext:php',category:'code'},
{title:'JavaScript Files',desc:'JavaScript files',query:'site:{TARGET} ext:js',category:'code'},
{title:'TypeScript Files',desc:'TypeScript files',query:'site:{TARGET} ext:ts OR ext:tsx',category:'code'},
{title:'HTML Files',desc:'HTML files',query:'site:{TARGET} ext:html OR ext:htm',category:'code'},
{title:'CSS Files',desc:'CSS files',query:'site:{TARGET} ext:css OR ext:scss OR ext:sass OR ext:less',category:'code'},
{title:'ASP Files',desc:'ASP files',query:'site:{TARGET} ext:asp OR ext:aspx',category:'code'},
{title:'JSP Files',desc:'JSP files',query:'site:{TARGET} ext:jsp OR ext:jspx',category:'code'},
{title:'Go Templates',desc:'Go template files',query:'site:{TARGET} ext:tmpl OR ext:gohtml',category:'code'},
{title:'React Files',desc:'JSX/React files',query:'site:{TARGET} ext:jsx',category:'code'},
{title:'Vue Files',desc:'Vue files',query:'site:{TARGET} ext:vue',category:'code'},
{title:'Svelte Files',desc:'Svelte files',query:'site:{TARGET} ext:svelte',category:'code'},
{title:'Angular Files',desc:'Angular files',query:'site:{TARGET} ext:component.ts',category:'code'},

// === Programming Languages ===
{title:'Python Files',desc:'Python files',query:'site:{TARGET} ext:py',category:'code'},
{title:'Python Wheels',desc:'Python wheel packages',query:'site:{TARGET} ext:whl',category:'files'},
{title:'Java Files',desc:'Java files',query:'site:{TARGET} ext:java',category:'code'},
{title:'C Files',desc:'C files',query:'site:{TARGET} ext:c',category:'code'},
{title:'C++ Files',desc:'C++ files',query:'site:{TARGET} ext:cpp OR ext:cxx OR ext:cc',category:'code'},
{title:'C# Files',desc:'C# files',query:'site:{TARGET} ext:cs',category:'code'},
{title:'Ruby Files',desc:'Ruby files',query:'site:{TARGET} ext:rb',category:'code'},
{title:'Rust Files',desc:'Rust files',query:'site:{TARGET} ext:rs',category:'code'},
{title:'Go Files',desc:'Go files',query:'site:{TARGET} ext:go',category:'code'},
{title:'Swift Files',desc:'Swift files',query:'site:{TARGET} ext:swift',category:'code'},
{title:'Kotlin Files',desc:'Kotlin files',query:'site:{TARGET} ext:kt OR ext:kts',category:'code'},
{title:'Scala Files',desc:'Scala files',query:'site:{TARGET} ext:scala',category:'code'},
{title:'Perl Files',desc:'Perl files',query:'site:{TARGET} ext:pl OR ext:pm',category:'code'},
{title:'Lua Files',desc:'Lua files',query:'site:{TARGET} ext:lua',category:'code'},
{title:'R Files',desc:'R files',query:'site:{TARGET} ext:r',category:'code'},
{title:'Haskell Files',desc:'Haskell files',query:'site:{TARGET} ext:hs',category:'code'},
{title:'Elixir Files',desc:'Elixir files',query:'site:{TARGET} ext:ex OR ext:exs',category:'code'},
{title:'Erlang Files',desc:'Erlang files',query:'site:{TARGET} ext:erl',category:'code'},
{title:'Dart Files',desc:'Dart files',query:'site:{TARGET} ext:dart',category:'code'},
{title:'Assembly Files',desc:'Assembly files',query:'site:{TARGET} ext:asm OR ext:s',category:'code'},
{title:'Objective-C Files',desc:'Objective-C files',query:'site:{TARGET} ext:m',category:'code'},
{title:'F# Files',desc:'F# files',query:'site:{TARGET} ext:fs OR ext:fsx',category:'code'},
{title:'Clojure Files',desc:'Clojure files',query:'site:{TARGET} ext:clj OR ext:cljs',category:'code'},
{title:'Groovy Files',desc:'Groovy files',query:'site:{TARGET} ext:groovy OR ext:gy',category:'code'},
{title:'Julia Files',desc:'Julia files',query:'site:{TARGET} ext:jl',category:'code'},
{title:'Nim Files',desc:'Nim files',query:'site:{TARGET} ext:nim',category:'code'},
{title:'Crystal Files',desc:'Crystal files',query:'site:{TARGET} ext:cr',category:'code'},
{title:'Zig Files',desc:'Zig files',query:'site:{TARGET} ext:zig',category:'code'},
{title:'V Files',desc:'V files',query:'site:{TARGET} ext:v',category:'code'},
{title:'Ada Files',desc:'Ada files',query:'site:{TARGET} ext:ada OR ext:adb OR ext:ads',category:'code'},

// === Configuration Formats ===
{title:'JSON Files',desc:'JSON files',query:'site:{TARGET} ext:json',category:'config'},
{title:'YAML Files',desc:'YAML files',query:'site:{TARGET} ext:yaml OR ext:yml',category:'config'},
{title:'XML Files',desc:'XML files',query:'site:{TARGET} ext:xml',category:'config'},
{title:'TOML Files',desc:'TOML files',query:'site:{TARGET} ext:toml',category:'config'},
{title:'INI Files',desc:'INI files',query:'site:{TARGET} ext:ini',category:'config'},
{title:'HCL Files',desc:'HashiCorp Configuration Language files',query:'site:{TARGET} ext:hcl',category:'config'},

// === Image Formats ===
{title:'JPEG Images',desc:'JPEG images',query:'site:{TARGET} ext:jpg OR ext:jpeg',category:'files'},
{title:'PNG Images',desc:'PNG images',query:'site:{TARGET} ext:png',category:'files'},
{title:'GIF Images',desc:'GIF images',query:'site:{TARGET} ext:gif',category:'files'},
{title:'BMP Images',desc:'BMP images',query:'site:{TARGET} ext:bmp',category:'files'},
{title:'TIFF Images',desc:'TIFF images',query:'site:{TARGET} ext:tiff OR ext:tif',category:'files'},
{title:'WebP Images',desc:'WebP images',query:'site:{TARGET} ext:webp',category:'files'},
{title:'SVG Files',desc:'SVG files',query:'site:{TARGET} ext:svg',category:'files'},
{title:'ICO Files',desc:'ICO icon files',query:'site:{TARGET} ext:ico',category:'files'},
{title:'PSD Files',desc:'Photoshop files',query:'site:{TARGET} ext:psd',category:'files'},
{title:'AI Files',desc:'Adobe Illustrator files',query:'site:{TARGET} ext:ai',category:'files'},
{title:'EPS Files',desc:'EPS files',query:'site:{TARGET} ext:eps',category:'files'},
{title:'RAW Images',desc:'RAW image files',query:'site:{TARGET} ext:raw OR ext:cr2 OR ext:nef OR ext:arw OR ext:dng',category:'files'},

// === Document Formats ===
{title:'PDF Files',desc:'PDF documents',query:'site:{TARGET} ext:pdf',category:'documents'},
{title:'Word Documents',desc:'Word documents',query:'site:{TARGET} ext:doc OR ext:docx',category:'documents'},
{title:'Excel Files',desc:'Excel files',query:'site:{TARGET} ext:xls OR ext:xlsx',category:'documents'},
{title:'PowerPoint Files',desc:'PowerPoint presentations',query:'site:{TARGET} ext:ppt OR ext:pptx',category:'documents'},
{title:'Text Files',desc:'Text files',query:'site:{TARGET} ext:txt',category:'files'},
{title:'Markdown Files',desc:'Markdown documents',query:'site:{TARGET} ext:md OR ext:markdown',category:'documents'},
{title:'RTF Files',desc:'RTF documents',query:'site:{TARGET} ext:rtf',category:'documents'},
{title:'ODT Files',desc:'OpenDocument files',query:'site:{TARGET} ext:odt OR ext:ods OR ext:odp',category:'documents'},
{title:'EPUB Files',desc:'EPUB e-books',query:'site:{TARGET} ext:epub',category:'documents'},
{title:'MOBI Files',desc:'MOBI e-books',query:'site:{TARGET} ext:mobi',category:'documents'},
{title:'CSV Files',desc:'CSV files',query:'site:{TARGET} ext:csv',category:'files'},
{title:'TSV Files',desc:'TSV files',query:'site:{TARGET} ext:tsv',category:'files'},

// === Audio Formats ===
{title:'MP3 Audio',desc:'MP3 audio files',query:'site:{TARGET} ext:mp3',category:'files'},
{title:'WAV Audio',desc:'WAV audio files',query:'site:{TARGET} ext:wav',category:'files'},
{title:'FLAC Audio',desc:'FLAC audio files',query:'site:{TARGET} ext:flac',category:'files'},
{title:'AAC Audio',desc:'AAC audio files',query:'site:{TARGET} ext:aac OR ext:m4a',category:'files'},
{title:'OGG Audio',desc:'OGG audio files',query:'site:{TARGET} ext:ogg OR ext:oga',category:'files'},
{title:'Opus Audio',desc:'Opus audio files',query:'site:{TARGET} ext:opus',category:'files'},
{title:'WMA Audio',desc:'WMA audio files',query:'site:{TARGET} ext:wma',category:'files'},

// === Video Formats ===
{title:'MP4 Video',desc:'MP4 video files',query:'site:{TARGET} ext:mp4',category:'files'},
{title:'AVI Video',desc:'AVI video files',query:'site:{TARGET} ext:avi',category:'files'},
{title:'MOV Video',desc:'MOV video files',query:'site:{TARGET} ext:mov',category:'files'},
{title:'WMV Video',desc:'WMV video files',query:'site:{TARGET} ext:wmv',category:'files'},
{title:'FLV Video',desc:'FLV video files',query:'site:{TARGET} ext:flv',category:'files'},
{title:'MKV Video',desc:'MKV video files',query:'site:{TARGET} ext:mkv',category:'files'},
{title:'WebM Video',desc:'WebM video files',query:'site:{TARGET} ext:webm',category:'files'},
{title:'MPEG Video',desc:'MPEG video files',query:'site:{TARGET} ext:mpeg OR ext:mpg',category:'files'},
{title:'3GP Video',desc:'3GP video files',query:'site:{TARGET} ext:3gp',category:'files'},

// === Archive Formats ===
{title:'ZIP Archives',desc:'ZIP archives',query:'site:{TARGET} ext:zip',category:'files'},
{title:'RAR Archives',desc:'RAR archives',query:'site:{TARGET} ext:rar',category:'files'},
{title:'7z Archives',desc:'7z archives',query:'site:{TARGET} ext:7z',category:'files'},
{title:'TAR Archives',desc:'TAR archives',query:'site:{TARGET} ext:tar',category:'files'},
{title:'GZIP Archives',desc:'GZIP archives',query:'site:{TARGET} ext:gz OR ext:tgz',category:'files'},
{title:'BZIP2 Archives',desc:'BZIP2 archives',query:'site:{TARGET} ext:bz2 OR ext:tbz2',category:'files'},
{title:'XZ Archives',desc:'XZ archives',query:'site:{TARGET} ext:xz OR ext:txz',category:'files'},
{title:'ISO Images',desc:'ISO image files',query:'site:{TARGET} ext:iso',category:'files'},
{title:'DMG Images',desc:'DMG image files',query:'site:{TARGET} ext:dmg',category:'files'},

// === Database Formats ===
{title:'SQL Files',desc:'SQL files',query:'site:{TARGET} ext:sql',category:'database'},
{title:'SQLite Files',desc:'SQLite database files',query:'site:{TARGET} ext:sqlite OR ext:sqlite3 OR ext:db',category:'database'},
{title:'MDB Files',desc:'Access database files',query:'site:{TARGET} ext:mdb OR ext:accdb',category:'database'},
{title:'DBF Files',desc:'DBF database files',query:'site:{TARGET} ext:dbf',category:'database'},
{title:'PostgreSQL Dumps',desc:'PostgreSQL dump files',query:'site:{TARGET} ext:pgdump OR ext:pgbackup',category:'database'},

// === Executable & Binary ===
{title:'EXE Files',desc:'Windows executable files',query:'site:{TARGET} ext:exe',category:'files'},
{title:'MSI Installers',desc:'MSI installer files',query:'site:{TARGET} ext:msi',category:'files'},
{title:'DEB Packages',desc:'DEB packages',query:'site:{TARGET} ext:deb',category:'files'},
{title:'RPM Packages',desc:'RPM packages',query:'site:{TARGET} ext:rpm',category:'files'},
{title:'APK Files',desc:'Android application packages',query:'site:{TARGET} ext:apk',category:'files'},
{title:'IPA Files',desc:'iOS application packages',query:'site:{TARGET} ext:ipa',category:'files'},
{title:'DLL Files',desc:'DLL library files',query:'site:{TARGET} ext:dll',category:'files'},
{title:'SO Files',desc:'Linux shared library files',query:'site:{TARGET} ext:so',category:'files'},
{title:'DYLIB Files',desc:'macOS dynamic library files',query:'site:{TARGET} ext:dylib',category:'files'},
{title:'JAR Files',desc:'Java archive files',query:'site:{TARGET} ext:jar',category:'files'},
{title:'WAR Files',desc:'Web application archive files',query:'site:{TARGET} ext:war',category:'files'},
{title:'EAR Files',desc:'Enterprise archive files',query:'site:{TARGET} ext:ear',category:'files'},
{title:'CLASS Files',desc:'Java class files',query:'site:{TARGET} ext:class',category:'files'},
{title:'PYC Files',desc:'Python compiled bytecode files',query:'site:{TARGET} ext:pyc OR ext:pyo',category:'files'},

// === Source Code (Niche Languages) ===
{title:'Pascal Files',desc:'Pascal files',query:'site:{TARGET} ext:pas OR ext:pp OR ext:lpr',category:'code'},
{title:'Fortran Files',desc:'Fortran files',query:'site:{TARGET} ext:f OR ext:for OR ext:f77 OR ext:f90 OR ext:f95',category:'code'},
{title:'COBOL Files',desc:'COBOL files',query:'site:{TARGET} ext:cob OR ext:cbl',category:'code'},
{title:'Lisp Files',desc:'Lisp files',query:'site:{TARGET} ext:lisp OR ext:lsp OR ext:cl OR ext:el',category:'code'},
{title:'Prolog Files',desc:'Prolog files',query:'site:{TARGET} ext:pl OR ext:pro',category:'code'},
{title:'Smalltalk Files',desc:'Smalltalk files',query:'site:{TARGET} ext:st',category:'code'},
{title:'Tcl Files',desc:'Tcl files',query:'site:{TARGET} ext:tcl',category:'code'},
{title:'VHDL Files',desc:'VHDL files',query:'site:{TARGET} ext:vhdl OR ext:vhd',category:'code'},
{title:'Verilog Files',desc:'Verilog files',query:'site:{TARGET} ext:v OR ext:sv',category:'code'},
{title:'MATLAB Files',desc:'MATLAB files',query:'site:{TARGET} ext:m',category:'code'},
{title:'SAS Files',desc:'SAS files',query:'site:{TARGET} ext:sas',category:'code'},
{title:'Stata Files',desc:'Stata files',query:'site:{TARGET} ext:do OR ext:dta',category:'code'},
{title:'SPSS Files',desc:'SPSS files',query:'site:{TARGET} ext:sps OR ext:sav',category:'code'},
{title:'LabVIEW Files',desc:'LabVIEW files',query:'site:{TARGET} ext:vi OR ext:lvproj',category:'code'},
{title:'AutoIt Files',desc:'AutoIt files',query:'site:{TARGET} ext:au3',category:'code'},
{title:'AutoHotkey Files',desc:'AutoHotkey files',query:'site:{TARGET} ext:ahk',category:'code'},
{title:'Game Maker Files',desc:'Game Maker files',query:'site:{TARGET} ext:gml',category:'code'},
{title:'Unity Files',desc:'Unity files',query:'site:{TARGET} ext:unity OR ext:prefab OR ext:mat',category:'code'},
{title:'Unreal Engine Files',desc:'Unreal Engine files',query:'site:{TARGET} ext:uasset OR ext:umap',category:'code'},
{title:'Godot Files',desc:'Godot files',query:'site:{TARGET} ext:gd OR ext:tscn',category:'code'},
{title:'RenPy Files',desc:'RenPy files',query:'site:{TARGET} ext:rpy',category:'code'},
{title:'Twine Files',desc:'Twine files',query:'site:{TARGET} ext:twee OR ext:tw',category:'code'},

// === CAD & 3D Formats ===
{title:'STL Files',desc:'STL 3D files',query:'site:{TARGET} ext:stl',category:'files'},
{title:'OBJ Files',desc:'OBJ 3D files',query:'site:{TARGET} ext:obj',category:'files'},
{title:'FBX Files',desc:'FBX 3D files',query:'site:{TARGET} ext:fbx',category:'files'},
{title:'Blend Files',desc:'Blender files',query:'site:{TARGET} ext:blend',category:'files'},
{title:'DWG Files',desc:'AutoCAD files',query:'site:{TARGET} ext:dwg',category:'files'},
{title:'DXF Files',desc:'DXF files',query:'site:{TARGET} ext:dxf',category:'files'},
{title:'STEP Files',desc:'STEP files',query:'site:{TARGET} ext:step OR ext:stp',category:'files'},
{title:'IGES Files',desc:'IGES files',query:'site:{TARGET} ext:iges OR ext:igs',category:'files'},

// === Font Formats ===
{title:'TTF Fonts',desc:'TrueType font files',query:'site:{TARGET} ext:ttf',category:'files'},
{title:'OTF Fonts',desc:'OpenType font files',query:'site:{TARGET} ext:otf',category:'files'},
{title:'WOFF Fonts',desc:'WOFF font files',query:'site:{TARGET} ext:woff',category:'files'},
{title:'WOFF2 Fonts',desc:'WOFF2 font files',query:'site:{TARGET} ext:woff2',category:'files'},
{title:'EOT Fonts',desc:'EOT font files',query:'site:{TARGET} ext:eot',category:'files'},

// === Log & System Files ===
{title:'Log Files',desc:'Log files',query:'site:{TARGET} ext:log',category:'logs'},
{title:'Syslog Files',desc:'Syslog files',query:'site:{TARGET} ext:syslog',category:'logs'},
{title:'Event Logs',desc:'Event log files',query:'site:{TARGET} ext:evtx',category:'logs'},
{title:'PCAP Files',desc:'Network packet capture files',query:'site:{TARGET} ext:pcap OR ext:cap OR ext:pcapng',category:'files'},
{title:'HAR Files',desc:'HTTP Archive files',query:'site:{TARGET} ext:har',category:'logs'},
{title:'Core Dumps',desc:'Core dump files',query:'site:{TARGET} ext:core OR ext:dmp OR ext:crash',category:'files'}
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'reconnaissance', name: 'Reconnaissance' },
    { id: 'secrets', name: 'Secrets & Keys' },
    { id: 'code', name: 'Source Code' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'config', name: 'Configuration' },
    { id: 'database', name: 'Databases' },
    { id: 'api', name: 'APIs' },
    { id: 'auth', name: 'Auth & Identity' },
    { id: 'vulns', name: 'Vulnerabilities' },
    { id: 'devops', name: 'DevOps & CI/CD' },
    { id: 'files', name: 'Files' },
    { id: 'documents', name: 'Documents' },
    { id: 'logs', name: 'Logs' },
    { id: 'backups', name: 'Backups' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'monitoring', name: 'Monitoring' },
    { id: 'saas', name: 'SaaS & External' },
    { id: 'misconfig', name: 'Misconfigurations' }
  ];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const filterWithAI = async () => {
    if (!aiPrompt.trim()) {
      showToastMessage('Please enter a search query');
      return;
    }

    setAiLoading(true);
    
    try {
      const systemPrompt = `You are a security researcher helper. I have ${dorkTemplates.length} Google dorks organized by categories: ${categories.map(c => c.name).join(', ')}.

Based on the user query, return ONLY a JSON array of category IDs that are most relevant. Choose from: ${categories.map(c => c.id).join(', ')}.

Return ONLY the JSON array, nothing else. Example: ["secrets","api","cloud"]`;

      const res = await fetch("https://api-ai.stringmanolo.qzz.io", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-oss:120b-cloud",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: aiPrompt }
          ],
          stream: true
        })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === "" || line.trim() === "data: [DONE]") continue;

          try {
            const jsonLine = line.replace(/^data: /, '').trim();
            if (!jsonLine) continue;

            const json = JSON.parse(jsonLine);

            if (json.choices && json.choices[0] && json.choices[0].delta) {
              const delta = json.choices[0].delta;
              if (delta.content) {
                fullResponse += delta.content;
              }
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }

      const clean = fullResponse.replace(/```json|```/g, '').trim();
      const categoryIds = JSON.parse(clean);
      
      if (categoryIds.length === 0) {
        setSelectedCategory('all');
        showToastMessage('No specific categories found, showing all');
      } else if (categoryIds.length === 1) {
        setSelectedCategory(categoryIds[0]);
        showToastMessage(`Filtered to: ${categories.find(c => c.id === categoryIds[0])?.name}`);
      } else {
        setSelectedCategory(categoryIds[0]);
        showToastMessage(`Found ${categoryIds.length} relevant categories`);
      }
    } catch (error) {
      showToastMessage('AI filter error');
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  const generateDorks = () => {
    if (!target.trim()) {
      showToastMessage('Please enter a target domain');
      return;
    }

    let filtered = dorkTemplates;
    if (selectedCategory !== 'all') {
      filtered = dorkTemplates.filter(d => d.category === selectedCategory);
    }


    const generated = filtered.map(template => {
      const processedValue = template.query.replace(/{TARGET}/g, target.trim());
      const isDirectUrl = processedValue.startsWith('http');

      return {
        ...template,
        url: isDirectUrl 
        ? processedValue 
        : 'https://www.google.com/search?q=' + encodeURIComponent(processedValue)
      };
    });

    setDorks(generated);
    showToastMessage(`Generated ${generated.length} dorks for ${target.trim()}`);
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

  const handleAIKeyPress = (e) => {
    if (e.key === 'Enter') {
      filterWithAI();
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'inherit'
    }}>
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

      {/* AI Filter Section */}
      <div style={{
        marginBottom: '1.5em',
        padding: '2em',
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        background: theme.bg
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5em',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyPress={handleAIKeyPress}
            placeholder="What you're looking for?"
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
            onClick={filterWithAI}
            disabled={aiLoading}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: aiLoading ? 'not-allowed' : 'pointer',
              opacity: aiLoading ? 0.5 : 1,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            {aiLoading ? 'Filtering...' : 'AI Filter'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        marginBottom: '1.5em',
        padding: '1.5em',
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        background: theme.bg
      }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75em 1em',
            fontSize: '1em',
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            background: theme.bg,
            color: theme.text,
            fontFamily: 'inherit',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({dorkTemplates.filter(d => cat.id === 'all' || d.category === cat.id).length})
            </option>
          ))}
        </select>
      </div>

      {/* Input Section */}
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
            <li>Use AI filter to find relevant dork categories</li>
            <li>Or manually select a category from the dropdown</li>
            <li>Enter your target domain in the input field</li>
            <li>Click "Generate" to create filtered dork queries</li>
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
