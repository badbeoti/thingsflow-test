import React from 'react';
import { FlatList, Text, View } from 'react-native';
import dayjs from 'dayjs';
import styled from '@emotion/native';

import { Issue, IssuesContext } from '../contexts/Issues';
import useHome from '../hooks/useHome';
import { AD_IMAGE_URL } from '../assets/link';

const IssueList = () => {
  const { issues } = React.useContext(IssuesContext);
  const { openAdUrl, handleSetCurrentPage, goToDetail, errorMsg } = useHome();

  const renderItem = ({ item, index }: { item: Issue; index: number }) => {
    if (item.title === 'ad') {
      return (
        <IssueItemContainer onPress={openAdUrl}>
          <IssueImageContainer
            source={{
              uri: AD_IMAGE_URL,
            }}
          />
        </IssueItemContainer>
      );
    }

    return (
      <IssueItemContainer onPress={() => goToDetail(index)}>
        <IssueTitleContainer>
          <View style={{ width: '70%' }}>
            <IssueTitleText>
              #{item.id} {item.title}
            </IssueTitleText>
            <IssueTitleText>
              작성자: {item.user.login} 작성일:{' '}
              {dayjs(item.updated_at).format('YYYY년 MM월 DD일')}
            </IssueTitleText>
          </View>
          <IssueItemComments>
            <IssueTitleText>코멘트: {item.comments}</IssueTitleText>
          </IssueItemComments>
        </IssueTitleContainer>
      </IssueItemContainer>
    );
  };

  return (
    <IssueListContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
        data={issues}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={handleSetCurrentPage}
        ListEmptyComponent={() => <Text>{errorMsg}</Text>}
      />
    </IssueListContainer>
  );
};

export default IssueList;

const IssueListContainer = styled.Pressable({
  width: '100%',
});

const IssueItemContainer = styled.Pressable({
  width: '100%',
});

const IssueImageContainer = styled.Image({
  paddingHorizontal: 18,
  paddingVertical: 32,
});

const IssueTitleContainer = styled.View({
  width: '100%',
  paddingHorizontal: 18,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const IssueTitleText = styled.Text({
  fontSize: 12,
  fontWeight: 'bold',
});

const IssueItemComments = styled.View({});

const Separator = styled.View({
  height: 1,
  backgroundColor: '#000000',
});
