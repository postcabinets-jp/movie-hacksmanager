const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(express.json());

// ログイン処理
server.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const db = router.db.getState();
    const users = db.users || [];
    
    // ユーザーを検索
    const user = users.find(u => u.email === email);
    
    // 開発用に固定パスワード
    const validPassword = password === 'password';
    
    if (user && validPassword) {
      // ログイン成功
      res.json({
        token: 'dummy-token-' + user.id,
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } else {
      // ログイン失敗
      res.status(401).json({ error: 'メールアドレスまたはパスワードが正しくありません' });
    }
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ error: 'ログイン処理に失敗しました' });
  }
});

// システム設定取得
server.get('/api/settings', (req, res) => {
  try {
    const db = router.db.getState();
    const settings = db.settings || {};
    res.json(settings);
  } catch (error) {
    console.error('システム設定取得エラー:', error);
    res.status(500).json({ error: 'システム設定の取得に失敗しました' });
  }
});

// システム設定更新
server.put('/api/settings', (req, res) => {
  try {
    const db = router.db.getState();
    const newSettings = req.body;
    
    // 設定を更新
    db.settings = {
      ...db.settings,
      ...newSettings
    };
    
    // データベースに保存
    router.db.setState(db);
    router.db.write();
    
    res.json(db.settings);
  } catch (error) {
    console.error('システム設定更新エラー:', error);
    res.status(500).json({ error: 'システム設定の更新に失敗しました' });
  }
});

// メールテンプレート一覧取得
server.get('/api/email-templates', (req, res) => {
  try {
    const db = router.db.getState();
    const templates = db['email-templates'] || [];
    res.json(templates);
  } catch (error) {
    console.error('メールテンプレート取得エラー:', error);
    res.status(500).json({ error: 'メールテンプレートの取得に失敗しました' });
  }
});

// メールテンプレート取得
server.get('/api/email-templates/:id', (req, res) => {
  try {
    const db = router.db.getState();
    const templates = db['email-templates'] || [];
    const template = templates.find(t => t.id === parseInt(req.params.id));
    
    if (!template) {
      return res.status(404).json({ error: 'テンプレートが見つかりません' });
    }
    
    res.json(template);
  } catch (error) {
    console.error('メールテンプレート取得エラー:', error);
    res.status(500).json({ error: 'メールテンプレートの取得に失敗しました' });
  }
});

// メールテンプレート作成
server.post('/api/email-templates', (req, res) => {
  try {
    const db = router.db.getState();
    const templates = db['email-templates'] || [];
    const newTemplate = {
      id: templates.length + 1,
      ...req.body
    };
    
    templates.push(newTemplate);
    db['email-templates'] = templates;
    
    router.db.setState(db);
    router.db.write();
    
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('メールテンプレート作成エラー:', error);
    res.status(500).json({ error: 'メールテンプレートの作成に失敗しました' });
  }
});

// メールテンプレート更新
server.put('/api/email-templates/:id', (req, res) => {
  try {
    const db = router.db.getState();
    const templates = db['email-templates'] || [];
    const templateIndex = templates.findIndex(t => t.id === parseInt(req.params.id));
    
    if (templateIndex === -1) {
      return res.status(404).json({ error: 'テンプレートが見つかりません' });
    }
    
    const updatedTemplate = {
      ...templates[templateIndex],
      ...req.body
    };
    
    templates[templateIndex] = updatedTemplate;
    db['email-templates'] = templates;
    
    router.db.setState(db);
    router.db.write();
    
    res.json(updatedTemplate);
  } catch (error) {
    console.error('メールテンプレート更新エラー:', error);
    res.status(500).json({ error: 'メールテンプレートの更新に失敗しました' });
  }
});

// メールテンプレート削除
server.delete('/api/email-templates/:id', (req, res) => {
  try {
    const db = router.db.getState();
    const templates = db['email-templates'] || [];
    const filteredTemplates = templates.filter(t => t.id !== parseInt(req.params.id));
    
    if (filteredTemplates.length === templates.length) {
      return res.status(404).json({ error: 'テンプレートが見つかりません' });
    }
    
    db['email-templates'] = filteredTemplates;
    router.db.setState(db);
    router.db.write();
    
    res.status(204).send();
  } catch (error) {
    console.error('メールテンプレート削除エラー:', error);
    res.status(500).json({ error: 'メールテンプレートの削除に失敗しました' });
  }
});

// CSVエクスポート機能
server.get('/api/viewing-records/export', (req, res) => {
  try {
    const db = router.db.getState();
    const records = db.viewing_records || [];
    const users = db.users || [];
    const videos = db.videos || [];

    // ユーザーとビデオの情報をマッピング
    const enrichedRecords = records.map(record => {
      const user = users.find(u => u.id === record.userId) || {};
      const video = videos.find(v => v.id === record.videoId) || {};
      return {
        id: record.id,
        userName: user.username || '不明',
        videoTitle: video.title || '不明',
        startTime: record.startTime,
        endTime: record.endTime,
        watchTime: record.watchTime,
        progress: record.progress,
        completed: record.completed
      };
    });

    // CSVヘッダー
    const csvHeader = 'ID,ユーザー名,動画タイトル,視聴開始時間,視聴終了時間,視聴時間（秒）,進捗率（%）,完了状態\n';
    
    // CSVデータ
    const csvData = enrichedRecords.map(record => {
      return [
        record.id,
        record.userName,
        record.videoTitle,
        record.startTime,
        record.endTime,
        record.watchTime,
        Math.round(record.progress),
        record.completed ? '完了' : '未完了'
      ].join(',');
    }).join('\n');

    // CSVレスポンスを返す
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="viewing-records.csv"');
    res.send(Buffer.from('\uFEFF' + csvHeader + csvData));
  } catch (error) {
    console.error('CSVエクスポートエラー:', error);
    res.status(500).json({ error: 'CSVエクスポートに失敗しました' });
  }
});

// 視聴記録一覧取得
server.get('/api/viewing-records', (req, res) => {
  try {
    const db = router.db.getState();
    const records = db.viewing_records || [];
    const users = db.users || [];
    const videos = db.videos || [];

    const enrichedRecords = records.map(record => {
      const user = users.find(u => u.id === record.userId) || {};
      const video = videos.find(v => v.id === record.videoId) || {};
      return {
        id: record.id,
        userName: user.username || '不明',
        videoTitle: video.title || '不明',
        watchTime: record.watchTime,
        progress: record.progress,
        completed: record.completed,
        lastViewedAt: record.endTime
      };
    });

    res.json(enrichedRecords);
  } catch (error) {
    console.error('視聴記録取得エラー:', error);
    res.status(500).json({ error: '視聴記録の取得に失敗しました' });
  }
});

// その他のAPIルート
server.use('/api', router);

server.listen(3000, () => {
  console.log('サーバーが起動しました（ポート3000）');
  console.log('データベースパス:', path.join(__dirname, 'db.json'));
}); 