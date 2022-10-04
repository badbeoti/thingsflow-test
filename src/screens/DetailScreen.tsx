import React from 'react';
import styled from '@emotion/native';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import dayjs from 'dayjs';
import { IssuesContext } from '../contexts/Issues';

const DetailScreen = () => {
  const { issueDetail } = React.useContext(IssuesContext);

  console.log(issueDetail);

  return (
    <DetailSafeAreaView>
      <StatusBar barStyle="light-content" />
      <IssueTitleContainer>
        <IssueAvatarImageContainer
          source={{ uri: issueDetail.user.avatar_url }}
        />
        <View style={{ width: '70%' }}>
          <IssueTitleText>
            #{issueDetail.id} {issueDetail.title}
          </IssueTitleText>
          <IssueTitleText>
            작성자: {issueDetail.user.login} 작성일:{' '}
            {dayjs(issueDetail.updated_at).format('YYYY년 MM월 DD일')}
          </IssueTitleText>
        </View>
        <IssueItemComments>
          <IssueTitleText>코멘트: {issueDetail.comments}</IssueTitleText>
        </IssueItemComments>
      </IssueTitleContainer>
      <ScrollView
        style={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}>
        <Markdown>{issueDetail.body}</Markdown>
      </ScrollView>
    </DetailSafeAreaView>
  );
};

export default DetailScreen;

const DetailSafeAreaView = styled.SafeAreaView({
  paddingHorizontal: 16,
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const IssueAvatarImageContainer = styled.Image({
  width: 32,
  height: 32,
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
  fontSize: 10,
  fontWeight: 'bold',
});

const IssueItemComments = styled.View({});
