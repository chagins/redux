import { useAppDispatch } from 'hooks/store';
import { ReactionEmoji } from 'lib/constants';
import { Post, ReactionEmojiValues } from 'lib/types';
import React from 'react';

const reactionEmoji: ReactionEmojiValues = {
  [ReactionEmoji.thumbsUp]: '👍',
  [ReactionEmoji.hooray]: '🎉',
  [ReactionEmoji.heart]: '❤️',
  [ReactionEmoji.rocket]: '🚀',
  [ReactionEmoji.eyes]: '👀',
};

interface ReactionButtonsProps {
  post: Post;
}

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  post: { reactions, id: postId },
}) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const emojiName = name as ReactionEmoji;
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch({ type: 'posts/reactionAdded', payload: { postId, reaction: emojiName } })
        }
      >
        {emoji} {reactions[emojiName]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
