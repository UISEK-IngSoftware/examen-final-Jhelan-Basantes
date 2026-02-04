import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { Character } from '../data/characters';
import './CharacterListItem.css';
import { useHistory } from 'react-router-dom';

interface CharacterListItemProps {
  character: Character;
}

const CharacterListItem: React.FC<CharacterListItemProps> = ({ character }) => {
  const history = useHistory();

  const goToProfile = () => {
    history.push(`/character/${character.id}`);
  };

  return (
    <IonCard onClick={goToProfile} className="character-card">
      <IonCardHeader>
        <IonAvatar slot="start">
          <img src={character.image || 'https://via.placeholder.com/150'} alt={character.name} />
        </IonAvatar>
        <IonCardTitle>{character.name}</IonCardTitle>
        <IonCardSubtitle>Género: {character.gender}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Estado: {character.status} <br />
        Especie: {character.species}
      </IonCardContent>
    </IonCard>
  );
};

export default CharacterListItem;
