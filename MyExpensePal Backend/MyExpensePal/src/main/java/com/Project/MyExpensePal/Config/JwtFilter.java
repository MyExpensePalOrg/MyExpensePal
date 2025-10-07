package com.Project.MyExpensePal.Config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Value("${jwt.secretKey}")
	String secretKey;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = request.getHeader("Authorization");
		String userId = request.getHeader("userId");
		if(token == null || !token.startsWith("Bearer ")) {
			//Throw Unauthorized exception
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No Token Found");
		} 
		
		token = token.substring(7);
		if(!isTokenValid(token, userId)){
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
		}
		
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, null, new ArrayList<>());
		SecurityContextHolder.getContext().setAuthentication(authToken);
		filterChain.doFilter(request, response);
		
	}
	
	private boolean isTokenValid(String token, String userId) {
		try {
			Claims claims =  Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
			if(userId!=null && userId.equals(claims.getSubject()))
				return true;
			return false;
		} catch (Exception e) {
			return false;
		}
	}
	
	private SecretKey getKey() {
		return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
	}

}
