import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

class SearchForm extends Component{
    state = {
        query: '',
    };

    handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
    };
    
    handleSubmit = event => {
        event.preventDefault();
        const { query } = this.state;
        const { onSubmit } = this.props;

        if (!query.trim()) {
            alert('Search field is empty');
            return;
        };

        onSubmit(query.toLocaleLowerCase())
        this.reset();
    };


    reset = () => {
    this.setState({ query: '' });
  };


 render() {
     return (
         <header className={s.Searchbar}>
             <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                 <button
                     type='submit'
                     className={s.SearchFormButton}
                     aria-label='Search images'
                 >
                     <ImSearch style={{ width: 22, height: 22 }} />
                 </button>

                 <input
                     className={s.SearchFormInput}
                     type='text'
                     name='searchQuery'
                     value={this.state.query}
                     autoComplete='off'
                     autoFocus
                     placeholder='Search images'
                     onChange={this.handleChange}
                 />
             </form>
         </header>
     );
    };

}


export default SearchForm;