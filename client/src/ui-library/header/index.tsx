import { HeaderContainer, IconContainer, ProfileIcon } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Flex } from '../flex';
import { H1, Label } from '../typography';
import { Svg } from 'assets/icons/svg';
import theme from 'assets/css/theme';



const workouts = [
  {
    id: 'wrkouid',
    name: '',
    duration: '',
    list: [
      {
        id: '',
        noOfset:'',
        reps:'',
      }
    ]
  }
]


export const Header = ({ title, subTitle }: { title?: string; subTitle?: string }) => {

  return (
    <HeaderContainer alignItemsCenter justifyContent='space-between'>
      <Flex alignItemsCenter gap='0.5rem'>
        {
          title && (
            <H1
              color={subTitle ? theme.secondary : theme.primary}
              fontWeight={subTitle ? 400 : 500}
            >
              {title}
            </H1>
          )
        }
        {
          subTitle && (
            <>
              <H1 fontWeight={400} >{'>'}</H1>
              <H1>{subTitle}</H1>
            </>
          )
        }
      </Flex>

      <Flex alignItemsCenter gap='2rem'>
        <IconContainer centered>
          <Svg name="video" />
        </IconContainer>
        <IconContainer centered>
          <Svg name="comments" />
        </IconContainer>
        <IconContainer centered>
          <Svg name="bell" />
        </IconContainer>
        <Flex gap='0.5rem' alignItemsCenter >
          <Label fontWeight={500}>John Doe</Label>
          <ProfileIcon centered>
            <FontAwesomeIcon fontSize={20} icon={faUser} />
          </ProfileIcon>
        </Flex>
      </Flex>
    </HeaderContainer>
  )
}