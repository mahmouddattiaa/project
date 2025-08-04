import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // This will redirect to the signin screen as the default route
  return <Redirect href="/signin" />;
}
