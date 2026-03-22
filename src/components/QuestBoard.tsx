import { useState } from 'react';
import { questData, fieldConfig, type Quest } from '../data/quests';

function renderStars(difficulty: number): string {
  const max = 10;
  let s = '';
  for (let i = 0; i < max; i++) s += i < difficulty ? '★' : '☆';
  return s;
}

function QuestCard({
  quest,
  accepted,
  onAccept,
}: {
  quest: Quest;
  accepted: boolean;
  onAccept: () => void;
}) {
  return (
    <div className="parchment-card">
      {accepted && (
        <div className="quest-stamp">
          QUEST<br />ACCEPTED
        </div>
      )}

      <div className="parchment-inner-border">
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        {/* タイトルエリア */}
        <div className="quest-header">
          <div className="quest-field-pos">
            <span className={`field-badge ${fieldConfig[quest.field] || 'field-other'}`}>
              {quest.field}
            </span>
          </div>
          <h2 className="quest-title quest-type">{quest.type}</h2>
          <p className="quest-title quest-name">〜 {quest.title} 〜</p>
        </div>

        {/* 詳細 2カラム */}
        <div className="quest-details">

          {/* 左カラム：基本情報 */}
          <div className="quest-col">
            <div className="quest-row">
              <span className="quest-label-inline">難易度：</span>
              <span className="quest-stars">{renderStars(quest.difficulty)}</span>
            </div>
            <div className="quest-row">
              <span className="quest-label-inline">制限時間：</span>
              <span>〜 {quest.deadline}</span>
            </div>
            <div className="quest-row">
              <span className="quest-label-inline">目的地：</span>
              <span>{quest.location}</span>
            </div>
            <div className="quest-row">
              <span className="quest-label-inline">報酬：</span>
              <span className="quest-reward">{quest.reward}</span>
            </div>
          </div>

          {/* 右カラム：条件＋コメント */}
          <div className="quest-col">
            <div>
              <span className="quest-section-title">達成条件</span>
              <ul className="quest-conditions">
                {quest.conditions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: 22 }}>
              <span className="quest-section-title">依頼者コメント</span>
              <p className="quest-comment-box">{quest.comment}</p>
            </div>
          </div>
        </div>

        {/* 受注ボタン */}
        <div className="quest-actions">
          <button
            className="guild-button"
            onClick={onAccept}
            disabled={accepted}
          >
            {accepted ? '受注済み' : 'クエストを受注する'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuestBoard({ category }: { category: string }) {
  const [acceptedQuests, setAcceptedQuests] = useState<number[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const quests = questData.filter((q) => q.category === category);

  const handleAccept = (id: number) => {
    if (acceptedQuests.includes(id)) return;
    setShowAnimation(true);
    setTimeout(() => {
      setAcceptedQuests((prev) => [...prev, id]);
      setShowAnimation(false);
    }, 1400);
  };

  return (
    <>
      {showAnimation && (
        <div className="accept-overlay">
          <div className="accept-stamp-huge">
            QUEST<br />ACCEPTED
          </div>
        </div>
      )}

      <div className="board-header">
        <h2 className="board-title">【 {category} 】 掲示板</h2>
      </div>

      <div className="quest-list">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            accepted={acceptedQuests.includes(quest.id)}
            onAccept={() => handleAccept(quest.id)}
          />
        ))}
      </div>
    </>
  );
}
