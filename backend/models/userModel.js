const supabase = require('../config/db'); // pastikan ini `supabaseClient`

const createUser = async (email, username, password) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, username, password }])
    .select('id'); // optional: ambil ID user baru

  if (error) throw error;
  return data[0].id;
};

const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); // karena hanya satu user yang boleh punya email tersebut

  if (error) return null; // bisa juga lempar error jika ingin ketat
  return data;
};

module.exports = { createUser, findUserByEmail };
