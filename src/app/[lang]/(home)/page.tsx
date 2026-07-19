import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  CreditCard,
  Database,
  Github,
  KeyRound,
  Layers,
  LockKeyhole,
  Network,
  Route,
  Server,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { NeuralBackground } from './page.client';
import { getLocalePath, i18n } from '@/lib/i18n';

type Feature = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type OpsCard = {
  title: string;
  items: string[];
  icon: LucideIcon;
};

type LocaleContent = {
  badge: string;
  title: string;
  lede: string;
  docs: string;
  governance: string;
  github: string;
  stats: { value: string; label: string }[];
  telemetry: { label: string; value: string }[];
  protocols: { title: string; body: string }[];
  governanceSection: {
    eyebrow: string;
    title: string;
    body: string;
    features: Feature[];
  };
  architectureSection: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { label: string; title: string; body: string }[];
    noteTitle: string;
    noteBody: string;
  };
  providersSection: {
    eyebrow: string;
    title: string;
    body: string;
  };
  operationsSection: {
    eyebrow: string;
    title: string;
    body: string;
    cards: OpsCard[];
  };
  deploySection: {
    eyebrow: string;
    title: string;
    body: string;
    body2: string;
    terminalTitle: string;
  };
};

const providerNames = [
  'OpenAI',
  'Azure OpenAI',
  'Claude',
  'Gemini',
  'AWS Bedrock',
  'Vertex AI',
  'Ollama',
  'DeepSeek',
  'Qwen',
  'GLM',
  'Kimi',
  'Doubao',
  'Hunyuan',
  'Qianfan',
  'Spark',
  'MiniMax',
  'SiliconFlow',
  'Dify / RAGFlow',
  'Kling',
  'Seedance',
  'Rerank',
  'Images',
  'Audio',
  'Video Tasks',
];

const contentMap: Record<string, LocaleContent> = {
  en: {
    badge: 'AI Model Governance · AgentOps · AGI Application Infrastructure',
    title: 'MAX API',
    lede: 'A unified access, authentication, routing, billing, observability, and governance layer between applications, Agents, users, organizations, and upstream model services. Built for multi-model, multi-provider, multimodal, and private deployment operations.',
    docs: 'View Docs',
    governance: 'Explore Governance',
    github: 'GitHub',
    stats: [
      { value: '40+ providers', label: 'Official and compatible ecosystems' },
      { value: 'Multi-protocol', label: 'OpenAI, Responses, Claude, Gemini' },
      { value: '3 databases', label: 'SQLite / MySQL / PostgreSQL' },
      { value: 'Ops gateway', label: 'Routing, billing, audit, rate limits' },
    ],
    telemetry: [
      { label: 'Routing', value: '88%' },
      { label: 'Billing', value: '74%' },
      { label: 'Audit', value: '81%' },
      { label: 'Tasks', value: '66%' },
    ],
    protocols: [
      { title: 'OpenAI Compatible', body: 'Chat / Image / Audio / Embedding' },
      { title: 'Responses', body: 'Modern application protocol access' },
      { title: 'Claude Messages', body: 'Message-format translation' },
      { title: 'Video Tasks', body: 'Submit, poll, and map states' },
    ],
    governanceSection: {
      eyebrow: 'CONTROL PLANES',
      title:
        'Put models, Agents, channels, and cost into one governance plane.',
      body: 'MAX API does not replace upstream models or Agent orchestration frameworks. It provides stable access boundaries, configurable policy, and auditable runtime records at the gateway layer.',
      features: [
        {
          title: 'Unified model access',
          body: 'Converge application calls through OpenAI-compatible, Responses, Claude Messages, Gemini, Realtime, and other entry points.',
          icon: Route,
        },
        {
          title: 'Agent token governance',
          body: 'Issue independent API keys for Agents, workflows, and tool calls with model scope, quota, expiration, and group control.',
          icon: KeyRound,
        },
        {
          title: 'Cost and billing accounting',
          body: 'Support model ratios, billing expressions, staged billing JSON, task rate cards, reservations, refunds, and usage logs.',
          icon: CreditCard,
        },
        {
          title: 'Audit and reliability',
          body: 'Use request logs, error logs, rate limits, streaming timeouts, weighted routing, retry controls, and admin audit boundaries.',
          icon: ShieldCheck,
        },
      ],
    },
    architectureSection: {
      eyebrow: 'ARCHITECTURE',
      title:
        'Layered architecture for long-running operations and provider evolution.',
      body: 'Requests flow through routing, middleware, controllers, and services, then Relay and Channel adapters forward them upstream. Data and cache layers support model governance, task state, logs, and billing.',
      steps: [
        {
          label: '01',
          title: 'Application / SDK / Agent',
          body: 'Unified application access reduces multi-SDK and multi-protocol maintenance.',
        },
        {
          label: '02',
          title: 'Router / Middleware',
          body: 'Authentication, rate limits, logs, dispatch, and context handling.',
        },
        {
          label: '03',
          title: 'Controller / Service',
          body: 'Model governance, AgentOps, billing, audit, and task management.',
        },
        {
          label: '04',
          title: 'Relay / Channel',
          body: 'Protocol conversion, model mapping, path overrides, and provider adapters.',
        },
        {
          label: '05',
          title: 'Upstream Providers',
          body: 'OpenAI, Claude, Gemini, domestic platforms, and custom upstream services.',
        },
      ],
      noteTitle: 'Designed for governance',
      noteBody:
        'Channel capability matrices, configuration checks, model discovery, task protocol templates, and pricing configuration help administrators reduce misconfiguration risk while keeping models, channels, tokens, users, and cost traceable.',
    },
    providersSection: {
      eyebrow: 'PROVIDER RADAR',
      title:
        'Connect mainstream model platforms, domestic ecosystems, and multimodal task services.',
      body: 'Actual model availability depends on lawful upstream authorization, channel configuration, model mapping, and provider capability. MAX API governs those capabilities instead of selling upstream model accounts or training foundation models.',
    },
    operationsSection: {
      eyebrow: 'OPERATIONS',
      title:
        'Built for teams, research groups, enterprises, and community services.',
      body: 'From single-node evaluation to multi-node deployment, MAX API keeps a lightweight start path while exposing database, Redis, session secret, encryption secret, and log directory controls for production.',
      cards: [
        {
          title: 'Channel configuration governance',
          icon: Network,
          items: [
            'Capability matrix for chat, responses, embeddings, images, audio, rerank, and video tasks.',
            'Pre-save validation for Base URL, JSON, Vertex AI regions, Codex credentials, and task path placeholders.',
            'Model mapping, path overrides, model discovery, and protocol templates.',
          ],
        },
        {
          title: 'Cost and usage governance',
          icon: Activity,
          items: [
            'Usage and cost statistics by user, token, model, channel, and group.',
            'Billing expressions for complex token pricing and rate cards for asynchronous video tasks.',
            'Reservations, failed-request refunds, model ratios, and usage logs.',
          ],
        },
        {
          title: 'Private deployment boundaries',
          icon: LockKeyhole,
          items: [
            'JWT, WebAuthn/Passkeys, OAuth, OIDC, Telegram, Discord, LinuxDO, and other login methods.',
            'Redis cache and memory cache for single-node and multi-node deployments.',
            'Request-size limits, streaming timeout control, error logs, and status checks.',
          ],
        },
      ],
    },
    deploySection: {
      eyebrow: 'DEPLOYMENT',
      title: 'Quick local start, Docker Compose recommended for production.',
      body: 'SQLite works for local evaluation. Production deployments should explicitly configure database, Redis, session secret, encryption secret, log directory, and operational compliance requirements.',
      body2:
        'The data layer supports SQLite, MySQL, and PostgreSQL, while the cache layer supports Redis and memory cache for growth from demos to multi-node operations.',
      terminalTitle: 'quick-start.sh',
    },
  },
  zh: {
    badge: 'AI 模型治理 · AgentOps · AGI 应用服务基础设施',
    title: 'MAX API',
    lede: '在应用、Agent、用户、组织与上游模型服务之间提供统一接入、鉴权、路由、计费、观测和治理层。面向多模型、多供应商、多模态任务和私有化运营场景，让 AI 工作负载更稳定、更可控地运行。',
    docs: '查看项目文档',
    governance: '浏览治理能力',
    github: 'GitHub',
    stats: [
      { value: '40+ 上游生态', label: '覆盖主流官方与兼容平台' },
      { value: '多协议入口', label: 'OpenAI、Responses、Claude、Gemini' },
      { value: '三类数据库', label: 'SQLite / MySQL / PostgreSQL' },
      { value: '可运营网关', label: '路由、计费、审计、限流' },
    ],
    telemetry: [
      { label: 'Routing', value: '88%' },
      { label: 'Billing', value: '74%' },
      { label: 'Audit', value: '81%' },
      { label: 'Tasks', value: '66%' },
    ],
    protocols: [
      { title: 'OpenAI Compatible', body: 'Chat / Image / Audio / Embedding' },
      { title: 'Responses', body: '新版应用协议接入' },
      { title: 'Claude Messages', body: '消息格式转换' },
      { title: 'Video Tasks', body: '提交、轮询、状态映射' },
    ],
    governanceSection: {
      eyebrow: 'CONTROL PLANES',
      title: '把模型、Agent、渠道和成本放到同一个治理平面。',
      body: 'MAX API 的重点不是替代上游模型，也不是替代 Agent 编排框架，而是在网关层提供稳定的访问边界、可配置策略和可审计运行记录。',
      features: [
        {
          title: '统一模型入口',
          body: '通过 OpenAI Compatible、Responses、Claude Messages、Gemini、Realtime 等入口，把应用侧调用收敛到统一网关。',
          icon: Route,
        },
        {
          title: 'Agent 令牌治理',
          body: '为 Agent、工作流和工具调用分配独立 API Key，按模型范围、额度、过期时间和分组做访问控制。',
          icon: KeyRound,
        },
        {
          title: '成本与计费核算',
          body: '支持模型倍率、表达式计费、分阶段计费 JSON、任务 rate-card、预扣费、失败退款和消费日志。',
          icon: CreditCard,
        },
        {
          title: '审计与可靠性',
          body: '提供请求日志、错误日志、限流、流式超时、渠道加权路由、失败重试和管理员侧审计边界。',
          icon: ShieldCheck,
        },
      ],
    },
    architectureSection: {
      eyebrow: 'ARCHITECTURE',
      title: '分层架构，面向长期运营和多供应商演进。',
      body: '请求经过路由、中间件、控制器和业务服务层，再由 Relay 与 Channel 适配器转发到上游。数据层和缓存层为模型治理、任务状态、日志与计费提供支撑。',
      steps: [
        {
          label: '01',
          title: 'Application / SDK / Agent',
          body: '应用侧统一接入，降低多 SDK 和多协议维护成本。',
        },
        {
          label: '02',
          title: 'Router / Middleware',
          body: '鉴权、限流、日志、分发与上下文处理。',
        },
        {
          label: '03',
          title: 'Controller / Service',
          body: '模型治理、AgentOps、计费、审计与任务管理。',
        },
        {
          label: '04',
          title: 'Relay / Channel',
          body: '协议转换、模型映射、路径覆盖与供应商适配。',
        },
        {
          label: '05',
          title: 'Upstream Providers',
          body: 'OpenAI、Claude、Gemini、国产平台与自定义上游。',
        },
      ],
      noteTitle: '为治理而设计',
      noteBody:
        '渠道能力矩阵、配置校验、模型发现、任务协议模板和价格配置帮助管理员降低误配置风险，并让模型、渠道、令牌、用户和成本维度保持可追踪。',
    },
    providersSection: {
      eyebrow: 'PROVIDER RADAR',
      title: '连接主流模型平台、国产模型生态和多模态任务服务。',
      body: '实际可用模型取决于合法上游授权、渠道配置、模型映射和服务商能力。MAX API 负责把这些能力纳入统一治理，而不是提供上游模型账号或基础模型训练。',
    },
    operationsSection: {
      eyebrow: 'OPERATIONS',
      title: '适合团队、研究机构、企业和社区服务的持续运营场景。',
      body: '从单机体验到多机部署，MAX API 同时保留轻量启动路径和数据库、Redis、会话密钥、加密密钥等生产配置面。',
      cards: [
        {
          title: '渠道配置治理',
          icon: Network,
          items: [
            '渠道能力矩阵显示 chat、responses、embeddings、images、audio、rerank、video tasks 等能力。',
            '保存前校验 Base URL、JSON 配置、Vertex AI 区域、Codex 凭证和任务路径占位符。',
            '支持模型映射、路径覆盖、模型发现和协议模板。',
          ],
        },
        {
          title: '成本和用量治理',
          icon: Activity,
          items: [
            '按用户、令牌、模型、渠道和分组维度统计用量与成本。',
            '表达式计费适配复杂 token 价格，rate-card 适配视频等异步任务。',
            '支持预扣费、失败退款、倍率计费和消费日志。',
          ],
        },
        {
          title: '私有化和安全边界',
          icon: LockKeyhole,
          items: [
            '支持 JWT、WebAuthn/Passkeys、OAuth、OIDC、Telegram、Discord、LinuxDO 等登录方式。',
            '支持 Redis 缓存与内存缓存，适配单机和多机部署。',
            '支持请求体大小限制、流式超时控制、错误日志和运行状态检查。',
          ],
        },
      ],
    },
    deploySection: {
      eyebrow: 'DEPLOYMENT',
      title: '本地快速体验，生产推荐 Docker Compose。',
      body: '默认可使用 SQLite 做本地体验。生产环境建议显式配置数据库、Redis、会话密钥、加密密钥和日志目录，并按所在司法辖区要求处理备案、授权、内容安全、实名、日志留存、税务和支付等合规事项。',
      body2:
        '数据库层兼容 SQLite、MySQL 与 PostgreSQL，缓存层支持 Redis 和内存缓存，便于从单机演示扩展到多机运营。',
      terminalTitle: 'quick-start.sh',
    },
  },
  ja: {
    badge: 'AI モデルガバナンス · AgentOps · AGI アプリ基盤',
    title: 'MAX API',
    lede: 'アプリ、Agent、ユーザー、組織、上流モデルサービスの間に、統一されたアクセス、認証、ルーティング、課金、可観測性、ガバナンス層を提供します。マルチモデル、マルチプロバイダー、マルチモーダルタスク、プライベート運用に向けて AI ワークロードを安定して制御します。',
    docs: 'ドキュメントを見る',
    governance: 'ガバナンスを見る',
    github: 'GitHub',
    stats: [
      {
        value: '40+ エコシステム',
        label: '主要な公式および互換プラットフォーム',
      },
      { value: '複数プロトコル', label: 'OpenAI、Responses、Claude、Gemini' },
      { value: '3 種類のDB', label: 'SQLite / MySQL / PostgreSQL' },
      {
        value: '運用型ゲートウェイ',
        label: 'ルーティング、課金、監査、レート制限',
      },
    ],
    telemetry: [
      { label: 'Routing', value: '88%' },
      { label: 'Billing', value: '74%' },
      { label: 'Audit', value: '81%' },
      { label: 'Tasks', value: '66%' },
    ],
    protocols: [
      { title: 'OpenAI Compatible', body: 'Chat / Image / Audio / Embedding' },
      { title: 'Responses', body: '新しいアプリケーションプロトコル' },
      { title: 'Claude Messages', body: 'メッセージ形式変換' },
      { title: 'Video Tasks', body: '送信、ポーリング、状態マッピング' },
    ],
    governanceSection: {
      eyebrow: 'CONTROL PLANES',
      title: 'モデル、Agent、チャネル、コストを一つのガバナンス平面へ。',
      body: 'MAX API は上流モデルや Agent オーケストレーションを置き換えるものではありません。ゲートウェイ層で安定したアクセス境界、設定可能なポリシー、監査可能な実行記録を提供します。',
      features: [
        {
          title: '統一モデル入口',
          body: 'OpenAI Compatible、Responses、Claude Messages、Gemini、Realtime などの入口でアプリ側の呼び出しを統合します。',
          icon: Route,
        },
        {
          title: 'Agent トークン管理',
          body: 'Agent、ワークフロー、ツール呼び出しに個別 API Key を発行し、モデル範囲、クォータ、有効期限、グループで制御します。',
          icon: KeyRound,
        },
        {
          title: 'コストと課金計算',
          body: 'モデル倍率、課金式、段階課金 JSON、タスク rate-card、予約、失敗時返金、利用ログに対応します。',
          icon: CreditCard,
        },
        {
          title: '監査と信頼性',
          body: 'リクエストログ、エラーログ、レート制限、ストリーミングタイムアウト、重み付きルーティング、再試行制御、管理者監査境界を提供します。',
          icon: ShieldCheck,
        },
      ],
    },
    architectureSection: {
      eyebrow: 'ARCHITECTURE',
      title: '長期運用とプロバイダー進化に向けたレイヤー構造。',
      body: 'リクエストはルーティング、ミドルウェア、コントローラー、サービスを通過し、Relay と Channel アダプターで上流へ転送されます。データ層とキャッシュ層がモデル管理、タスク状態、ログ、課金を支えます。',
      steps: [
        {
          label: '01',
          title: 'Application / SDK / Agent',
          body: 'アプリ側の統一アクセスにより複数 SDK と複数プロトコルの保守負荷を下げます。',
        },
        {
          label: '02',
          title: 'Router / Middleware',
          body: '認証、レート制限、ログ、分配、コンテキスト処理。',
        },
        {
          label: '03',
          title: 'Controller / Service',
          body: 'モデルガバナンス、AgentOps、課金、監査、タスク管理。',
        },
        {
          label: '04',
          title: 'Relay / Channel',
          body: 'プロトコル変換、モデルマッピング、パス上書き、プロバイダー適配。',
        },
        {
          label: '05',
          title: 'Upstream Providers',
          body: 'OpenAI、Claude、Gemini、国内プラットフォーム、カスタム上流。',
        },
      ],
      noteTitle: 'ガバナンスのための設計',
      noteBody:
        'チャネル能力マトリクス、設定チェック、モデル発見、タスクプロトコルテンプレート、価格設定により、管理者は誤設定リスクを下げ、モデル、チャネル、トークン、ユーザー、コストを追跡できます。',
    },
    providersSection: {
      eyebrow: 'PROVIDER RADAR',
      title:
        '主要モデル基盤、国内モデルエコシステム、マルチモーダルタスクサービスへ接続。',
      body: '実際に利用できるモデルは、合法的な上流認可、チャネル設定、モデルマッピング、サービス提供者の能力に依存します。MAX API は上流アカウント販売や基盤モデル学習ではなく、これらの能力を統一的に管理します。',
    },
    operationsSection: {
      eyebrow: 'OPERATIONS',
      title: 'チーム、研究機関、企業、コミュニティサービスの継続運用へ。',
      body: '単一ノードの体験からマルチノード展開まで、軽量な開始方法と、データベース、Redis、セッションキー、暗号化キーなどの本番設定を両立します。',
      cards: [
        {
          title: 'チャネル設定ガバナンス',
          icon: Network,
          items: [
            'chat、responses、embeddings、images、audio、rerank、video tasks などの能力マトリクス。',
            'Base URL、JSON、Vertex AI リージョン、Codex 認証情報、タスクパスプレースホルダーを保存前に検証。',
            'モデルマッピング、パス上書き、モデル発見、プロトコルテンプレートに対応。',
          ],
        },
        {
          title: 'コストと利用量管理',
          icon: Activity,
          items: [
            'ユーザー、トークン、モデル、チャネル、グループ単位で利用量とコストを集計。',
            '複雑な token 価格向けの課金式と非同期動画タスク向け rate-card。',
            '予約、失敗時返金、倍率課金、利用ログに対応。',
          ],
        },
        {
          title: 'プライベート展開と安全境界',
          icon: LockKeyhole,
          items: [
            'JWT、WebAuthn/Passkeys、OAuth、OIDC、Telegram、Discord、LinuxDO などのログイン方式。',
            'Redis キャッシュとメモリキャッシュで単一ノードとマルチノードをサポート。',
            'リクエストサイズ制限、ストリーミングタイムアウト、エラーログ、状態確認。',
          ],
        },
      ],
    },
    deploySection: {
      eyebrow: 'DEPLOYMENT',
      title: 'ローカルで素早く開始し、本番では Docker Compose を推奨。',
      body: 'ローカル評価では SQLite を使用できます。本番環境ではデータベース、Redis、セッションキー、暗号化キー、ログディレクトリ、運用上のコンプライアンス要件を明示的に設定してください。',
      body2:
        'データ層は SQLite、MySQL、PostgreSQL に対応し、キャッシュ層は Redis とメモリキャッシュに対応します。デモからマルチノード運用へ拡張できます。',
      terminalTitle: 'quick-start.sh',
    },
  },
};

const accentClasses = [
  'text-cyan-300 border-cyan-300/40 bg-cyan-300/10',
  'text-emerald-300 border-emerald-300/40 bg-emerald-300/10',
  'text-amber-300 border-amber-300/40 bg-amber-300/10',
  'text-rose-300 border-rose-300/40 bg-rose-300/10',
];

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mb-9 grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(260px,0.48fr)] md:items-end">
      <div>
        <span className="mb-3 block text-sm font-bold text-emerald-300">
          {eyebrow}
        </span>
        <h2 className="max-w-3xl text-3xl leading-tight font-semibold text-white md:text-4xl">
          {title}
        </h2>
      </div>
      <p className="text-sm leading-7 text-slate-400 md:text-base">{body}</p>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  return (
    <article className="min-h-[260px] rounded-lg border border-teal-100/15 bg-[#071011] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.2)]">
      <div
        className={`mb-5 grid size-11 place-items-center rounded-lg border ${accentClasses[index % accentClasses.length]}`}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="text-lg leading-snug font-semibold text-white">
        {feature.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-400">{feature.body}</p>
    </article>
  );
}

function OperationsCard({ card }: { card: OpsCard }) {
  const Icon = card.icon;
  return (
    <article className="min-h-[230px] rounded-lg border border-teal-100/15 bg-[#071011] p-6">
      <div className="mb-4 inline-flex items-center gap-3 text-white">
        <span className="grid size-10 place-items-center rounded-lg border border-cyan-300/35 bg-cyan-300/10 text-cyan-300">
          <Icon className="size-5" />
        </span>
        <h3 className="text-base font-semibold">{card.title}</h3>
      </div>
      <ul className="grid gap-3 text-sm leading-6 text-slate-400">
        {card.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = contentMap[lang] || contentMap.en;
  const docsPath = getLocalePath(lang, 'docs');

  return (
    <main className="overflow-hidden bg-[#030607] text-slate-100">
      <section className="relative isolate min-h-[calc(100svh-72px)] border-b border-teal-100/10 pt-12 md:pt-28">
        <NeuralBackground />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,7,0.96),rgba(3,6,7,0.5)_48%,rgba(3,6,7,0.82)),linear-gradient(180deg,rgba(3,6,7,0.02),rgba(3,6,7,0.82))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(3,6,7,0),#030607_76%)]" />

        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 pt-6 pb-16 md:grid-cols-[minmax(0,1fr)_390px] md:items-center md:pt-10 md:pb-20 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
              <span className="size-2.5 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(134,240,141,0.8)]" />
              {content.badge}
            </span>
            <h1 className="mt-6 max-w-3xl text-6xl leading-[0.92] font-semibold tracking-normal text-white md:text-8xl">
              {content.title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {content.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={docsPath}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/45 bg-emerald-200 px-5 font-bold text-[#06100a] shadow-[0_14px_32px_rgba(134,240,141,0.18)] transition-colors hover:bg-emerald-100"
              >
                <BookOpen className="size-4" />
                {content.docs}
              </Link>
              <a
                href="#governance"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/35 bg-[#071011]/80 px-5 font-bold text-white transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/10"
              >
                {content.governance}
                <ArrowRight className="size-4" />
              </a>
              <a
                href="https://github.com/MAX-API-Next/MAX-API"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-teal-100/20 bg-[#071011]/70 px-5 font-bold text-slate-100 transition-colors hover:bg-white/10"
              >
                <Github className="size-4" />
                {content.github}
              </a>
            </div>
            <div className="mt-8 grid max-w-3xl grid-cols-[repeat(2,minmax(0,1fr))] gap-3 lg:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="min-h-[88px] min-w-0 overflow-hidden rounded-lg border border-teal-100/15 bg-[#050d0e]/75 p-4"
                >
                  <strong className="block text-base leading-snug break-words text-white">
                    {stat.value}
                  </strong>
                  <span className="mt-2 block text-xs leading-5 break-all text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden min-h-[430px] overflow-hidden rounded-lg border border-cyan-300/25 bg-[#050d0e]/85 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.32)] md:block">
            <div className="flex items-center justify-between gap-4 border-b border-teal-100/15 pb-4 text-sm text-slate-300">
              <span>Gateway Control Plane</span>
              <span className="inline-flex items-center gap-2 font-bold text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-300" />
                online
              </span>
            </div>
            <div className="mt-5 grid gap-4">
              {content.telemetry.map((row, index) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[92px_1fr_auto] items-center gap-3 text-sm text-slate-300"
                >
                  <span>{row.label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <span
                      className={`block h-full rounded-full shadow-[0_0_20px_currentColor] ${index === 0 ? 'bg-cyan-300 text-cyan-300' : index === 1 ? 'bg-emerald-300 text-emerald-300' : index === 2 ? 'bg-amber-300 text-amber-300' : 'bg-rose-300 text-rose-300'}`}
                      style={{ width: row.value }}
                    />
                  </div>
                  <strong className="text-white">{row.value}</strong>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {content.protocols.map((protocol) => (
                <div
                  key={protocol.title}
                  className="min-h-[62px] rounded-lg border border-teal-100/15 bg-white/[0.035] p-3 text-xs leading-5 text-slate-400"
                >
                  <strong className="block text-sm text-white">
                    {protocol.title}
                  </strong>
                  {protocol.body}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-teal-100/15 bg-black/20 p-4">
              <div className="mb-3 flex items-center justify-between text-[11px] tracking-[0.12em] text-slate-500 uppercase">
                <span>Policy ledger</span>
                <span className="text-emerald-300">synced</span>
              </div>
              <div className="grid gap-2">
                {[
                  ['Auth boundary', 'JWT / OAuth / OIDC', 'allow'],
                  ['Route policy', 'weighted channel dispatch', 'active'],
                  ['Quota guard', 'pre-consume + settlement', 'protected'],
                  ['Audit stream', 'request and billing logs', 'recording'],
                ].map(([label, detail, state]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-white/[0.07] py-2 last:border-0"
                  >
                    <div>
                      <strong className="block text-xs text-slate-200">
                        {label}
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        {detail}
                      </span>
                    </div>
                    <span className="self-center text-[11px] font-semibold text-cyan-300">
                      {state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="governance" className="border-t border-teal-100/10 py-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHeading {...content.governanceSection} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.governanceSection.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="architecture"
        className="border-t border-teal-100/10 bg-[#050909] py-20"
      >
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHeading {...content.architectureSection} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid gap-3 rounded-lg border border-teal-100/15 bg-[#071011] p-5 lg:grid-cols-5">
              {content.architectureSection.steps.map((step, index) => (
                <div
                  key={step.label}
                  className="relative grid min-h-[170px] content-center gap-3 rounded-lg border border-teal-100/15 bg-white/[0.035] p-4"
                >
                  {index < content.architectureSection.steps.length - 1 && (
                    <span className="absolute top-1/2 right-[-14px] z-10 hidden h-px w-4 bg-cyan-300/40 lg:block" />
                  )}
                  <small className="font-bold text-emerald-300">
                    {step.label}
                  </small>
                  <strong className="text-sm leading-snug text-white">
                    {step.title}
                  </strong>
                  <span className="text-xs leading-5 text-slate-400">
                    {step.body}
                  </span>
                </div>
              ))}
            </div>
            <aside className="rounded-lg border border-amber-300/30 bg-[#10100a] p-6">
              <Layers className="mb-4 size-8 text-amber-300" />
              <h3 className="text-lg font-semibold text-amber-200">
                {content.architectureSection.noteTitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {content.architectureSection.noteBody}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="providers" className="border-t border-teal-100/10 py-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHeading {...content.providersSection} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {providerNames.map((provider) => (
              <div
                key={provider}
                className="flex min-h-[58px] items-center justify-center rounded-lg border border-teal-100/15 bg-[#0b1718] px-3 text-center text-sm text-slate-300"
              >
                {provider}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-100/10 bg-[#050909] py-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHeading {...content.operationsSection} />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.operationsSection.cards.map((card) => (
              <OperationsCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section id="deploy" className="border-t border-teal-100/10 py-20">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(300px,0.65fr)]">
          <div className="rounded-lg border border-teal-100/15 bg-[#071011] p-7">
            <span className="mb-3 block text-sm font-bold text-emerald-300">
              {content.deploySection.eyebrow}
            </span>
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold text-white md:text-4xl">
              {content.deploySection.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
              {content.deploySection.body}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
              {content.deploySection.body2}
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-teal-100/15 bg-white/[0.035] p-3">
                <Database className="size-4 text-cyan-300" />
                SQLite / MySQL / PostgreSQL
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-teal-100/15 bg-white/[0.035] p-3">
                <Server className="size-4 text-emerald-300" />
                Redis / Memory Cache
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-teal-100/15 bg-white/[0.035] p-3">
                <Boxes className="size-4 text-amber-300" />
                Docker Compose
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-emerald-300/25 bg-[#020403] shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
            <div className="flex min-h-10 items-center gap-2 border-b border-teal-100/15 px-4 text-xs text-slate-400">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-300" />
              <span className="ml-2 inline-flex items-center gap-2">
                <Terminal className="size-3.5" />
                {content.deploySection.terminalTitle}
              </span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-7 text-emerald-100">
              <code>{`docker pull cscitechtop/max-api:latest

docker run --name max-api -d --restart always \\
  -p 3000:3000 \\
  -e TZ=Asia/Shanghai \\
  -v ./data:/data \\
  cscitechtop/max-api:latest

# open http://localhost:3000`}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
