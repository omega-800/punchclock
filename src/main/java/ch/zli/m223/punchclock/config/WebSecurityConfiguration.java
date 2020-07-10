package ch.zli.m223.punchclock.config;

import ch.zli.m223.punchclock.security.JWTAuthenticationFilter;
import ch.zli.m223.punchclock.security.JWTAuthorizationFilter;
import ch.zli.m223.punchclock.security.SecurityConstants;
import ch.zli.m223.punchclock.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.ws.rs.HttpMethod;

@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private UserService userService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurityConfiguration(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/", "/**/*.html", "/**/*.js", "/**/*.css", "/h2-console").permitAll()
                .antMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL).permitAll()
                .antMatchers("/*.html").permitAll()
                .antMatchers(HttpMethod.GET, "/entries").permitAll()
                .antMatchers(HttpMethod.DELETE, "/entries").permitAll()
                .antMatchers(HttpMethod.PUT, "/entries").permitAll()
                .antMatchers(HttpMethod.PUT, "/entries/*").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/projects").permitAll()
                .antMatchers(HttpMethod.DELETE, "/projects").permitAll()
                .antMatchers(HttpMethod.PUT, "/projects/*").permitAll()
                .antMatchers("/*.js").permitAll()
                .antMatchers("/*.css").permitAll()
                .antMatchers("/*.ico").permitAll()


                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}
