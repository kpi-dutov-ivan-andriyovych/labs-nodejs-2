import express from "express";
import morgan from "morgan";
import path from "path";
import FAQ from "./data/faq.json" with { type: "json" };

const app = express();

app.use('/fonts/geist', express.static('node_modules/geist/dist/fonts'));
app.use(morgan('dev'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

app.get('/', (req, res) => res.render('index', { page: 'home' }));

app.get('/faq', (req, res) => {
  const data = {
    faq: FAQ,
  };
  res.render('faq', { page: 'faq', data });
});

app.get('/team', (req, res) => {
  // TODO: replace placeholder names with actual student names
  const students = [
    { id: 1, name: 'Учасник №1 (@Sashen_nka)', avatar: 'https://ui-avatars.com/api/?name=Alex', role: 'EJS Developer' },
    { id: 2, name: 'Учасник №2 (@Karlsonn25)', avatar: 'https://ui-avatars.com/api/?name=Karl', role: 'Data Architect' },
    { id: 3, name: 'Учасник №3 (@spnch1)', avatar: 'https://ui-avatars.com/api/?name=spnch', role: 'UI/UX Designer' },
    { id: 4, name: 'Учасник №4 (@tinixjn)', avatar: 'https://ui-avatars.com/api/?name=dev', role: 'Navigation Dev' },
    { id: 5, name: 'Учасник №5 (@partur1)', avatar: 'https://ui-avatars.com/api/?name=part', role: 'Error Handler' }
  ];
  
  res.render('team', { page: 'team', students });
});

app.use((req, res) => {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
